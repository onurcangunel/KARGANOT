import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';

interface YokAtlasUniversity {
  universityId: string;
  universityName: string;
  city: string;
  type: string;
}

interface YokAtlasFaculty {
  facultyId: string;
  facultyName: string;
  universityName: string;
}

interface YokAtlasDepartment {
  programId: string;
  programName: string;
  facultyName: string;
  universityName: string;
  city: string;
  type: string;
  quota?: number;
  scoreType?: string;
}

@Injectable()
export class UniversitiesService implements OnModuleInit {
  private readonly logger = new Logger(UniversitiesService.name);
  private readonly pythonApiUrl = process.env.PYTHON_API_URL || 'http://localhost:8000';
  private lastSyncTime: Date | null = null;

  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    // İlk başlatmada veritabanını kontrol et
    const count = await this.prisma.university.count();
    if (count === 0) {
      this.logger.log('No universities found. Starting initial sync...');
      // Async çalıştır, startup'ı bloke etme
      this.syncFromYokAtlas().catch(err => 
        this.logger.error(`Initial sync failed: ${err.message}`)
      );
    } else {
      this.logger.log(`Found ${count} universities in database.`);
    }
  }

  /**
   * Haftalık otomatik senkronizasyon (Her Pazar 03:00)
   */
  @Cron(CronExpression.EVERY_WEEK)
  async handleWeeklyCron() {
    this.logger.log('Starting weekly YÖK Atlas sync...');
    await this.syncFromYokAtlas();
  }

  /**
   * YÖK Atlas'tan tüm verileri çek ve veritabanına kaydet
   */
  async syncFromYokAtlas(): Promise<{ 
    universities: number; 
    faculties: number; 
    departments: number;
  }> {
    try {
      this.logger.log('Fetching universities from YÖK Atlas...');
      
      const universitiesResponse = await axios.get<YokAtlasUniversity[]>(
        `${this.pythonApiUrl}/universities`,
        { timeout: 120000 }
      );
      const universities = universitiesResponse.data;
      this.logger.log(`Fetched ${universities.length} universities`);

      let uniCount = 0;
      let facultyCount = 0;
      let deptCount = 0;

      for (const yokUni of universities) {
        try {
          // Önce mevcut üniversiteyi bul
          let university = await this.prisma.university.findFirst({
            where: { name: yokUni.universityName },
          });

          // Yoksa oluştur, varsa güncelle
          if (!university) {
            university = await this.prisma.university.create({
              data: {
                name: yokUni.universityName,
                city: yokUni.city || 'Türkiye',
                yokAtlasId: yokUni.universityId,
              },
            });
          } else {
            university = await this.prisma.university.update({
              where: { id: university.id },
              data: {
                city: yokUni.city || 'Türkiye',
                yokAtlasId: yokUni.universityId,
                updatedAt: new Date(),
              },
            });
          }
          uniCount++;

          try {
            const facultiesResponse = await axios.get<YokAtlasFaculty[]>(
              `${this.pythonApiUrl}/faculties`,
              { 
                params: { universityName: yokUni.universityName },
                timeout: 30000 
              }
            );
            const faculties = facultiesResponse.data;

            for (const yokFac of faculties) {
              try {
                const faculty = await this.prisma.faculty.upsert({
                  where: {
                    universityId_name: {
                      universityId: university.id,
                      name: yokFac.facultyName,
                    },
                  },
                  create: {
                    name: yokFac.facultyName,
                    universityId: university.id,
                    yokAtlasId: yokFac.facultyId,
                    isActive: true,
                  },
                  update: {
                    yokAtlasId: yokFac.facultyId,
                    updatedAt: new Date(),
                  },
                });
                facultyCount++;

                try {
                  const programsResponse = await axios.get<YokAtlasDepartment[]>(
                    `${this.pythonApiUrl}/programs`,
                    {
                      params: {
                        facultyName: yokFac.facultyName,
                        universityName: yokUni.universityName,
                      },
                      timeout: 30000,
                    }
                  );
                  const programs = programsResponse.data;

                  for (const prog of programs) {
                    try {
                      await this.prisma.department.upsert({
                        where: {
                          universityId_name: {
                            universityId: university.id,
                            name: prog.programName,
                          },
                        },
                        create: {
                          name: prog.programName,
                          universityId: university.id,
                          facultyId: faculty.id,
                          yokAtlasId: prog.programId,
                          quota: prog.quota || 0,
                          scoreType: prog.scoreType || null,
                          isActive: true,
                        },
                        update: {
                          facultyId: faculty.id,
                          yokAtlasId: prog.programId,
                          quota: prog.quota || 0,
                          scoreType: prog.scoreType || null,
                          updatedAt: new Date(),
                        },
                      });
                      deptCount++;
                    } catch (error) {
                      this.logger.warn(`Failed to save department: ${error.message}`);
                    }
                  }
                } catch (error) {
                  this.logger.warn(`Failed to fetch programs: ${error.message}`);
                }
              } catch (error) {
                this.logger.warn(`Failed to save faculty: ${error.message}`);
              }
            }
          } catch (error) {
            this.logger.warn(`Failed to fetch faculties: ${error.message}`);
          }

          await this.sleep(500);
        } catch (error) {
          this.logger.warn(`Failed to process university: ${error.message}`);
        }
      }

      this.lastSyncTime = new Date();
      this.logger.log(`✅ Sync completed: ${uniCount} universities, ${facultyCount} faculties, ${deptCount} departments`);

      return { universities: uniCount, faculties: facultyCount, departments: deptCount };
    } catch (error) {
      this.logger.error(`❌ YÖK Atlas sync failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Üniversite ara (autocomplete)
   */
  async searchUniversities(query: string, limit = 10) {
    return this.prisma.university.findMany({
      where: {
        isActive: true,
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { city: { contains: query, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        name: true,
        city: true,
        type: true,
      },
      take: limit,
      orderBy: { name: 'asc' },
    });
  }

  /**
   * Fakülte ara
   */
  async searchFaculties(universityId: string, query?: string, limit = 20) {
    return this.prisma.faculty.findMany({
      where: {
        universityId,
        isActive: true,
        ...(query && { name: { contains: query, mode: 'insensitive' } }),
      },
      select: {
        id: true,
        name: true,
        university: { select: { id: true, name: true } },
      },
      take: limit,
      orderBy: { name: 'asc' },
    });
  }

  /**
   * Bölüm ara
   */
  async searchDepartments(
    universityId?: string,
    facultyId?: string,
    query?: string,
    limit = 50,
  ) {
    return this.prisma.department.findMany({
      where: {
        isActive: true,
        ...(universityId && { universityId }),
        ...(facultyId && { facultyId }),
        ...(query && { name: { contains: query, mode: 'insensitive' } }),
      },
      select: {
        id: true,
        name: true,
        scoreType: true,
        quota: true,
        university: { select: { id: true, name: true, city: true } },
        faculty: { select: { id: true, name: true } },
      },
      take: limit,
      orderBy: { name: 'asc' },
    });
  }

  // Legacy methods (backward compatibility)
  async findAll(params?: { city?: string; search?: string }) {
    const where: any = { isActive: true };
    
    if (params?.city) where.city = params.city;
    if (params?.search) where.name = { contains: params.search, mode: 'insensitive' };

    return this.prisma.university.findMany({
      where,
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: string) {
    return this.prisma.university.findUnique({
      where: { id },
      include: { departments: true, faculties: true },
    });
  }

  async getDepartments(universityId: string) {
    return this.prisma.department.findMany({
      where: { universityId },
      orderBy: { name: 'asc' },
    });
  }

  async getCourses(departmentId: string) {
    return this.prisma.course.findMany({
      where: { departmentId },
      orderBy: { code: 'asc' },
    });
  }

  async getCities() {
    const universities = await this.prisma.university.findMany({
      select: { city: true },
      distinct: ['city'],
      orderBy: { city: 'asc' },
    });
    return universities.map(u => u.city);
  }

  getSyncStatus() {
    return {
      lastSyncTime: this.lastSyncTime,
      pythonApiUrl: this.pythonApiUrl,
    };
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
