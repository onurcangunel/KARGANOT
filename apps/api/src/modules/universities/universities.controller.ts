import { Controller, Get, Param, Query, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { UniversitiesService } from './universities.service';

@ApiTags('universities')
@Controller('universities')
export class UniversitiesController {
  constructor(private universitiesService: UniversitiesService) {}

  @Get()
  @ApiOperation({ summary: 'List all universities' })
  @ApiQuery({ name: 'city', required: false })
  @ApiQuery({ name: 'search', required: false })
  async findAll(@Query('city') city?: string, @Query('search') search?: string) {
    const data = await this.universitiesService.findAll({ city, search });
    return { data, total: data.length };
  }

  @Get('search')
  @ApiOperation({ summary: 'Search universities (autocomplete)' })
  @ApiQuery({ name: 'q', required: true, description: 'Search query' })
  @ApiQuery({ name: 'limit', required: false, description: 'Result limit' })
  async search(
    @Query('q') query: string,
    @Query('limit') limit?: string,
  ) {
    const data = await this.universitiesService.searchUniversities(
      query,
      limit ? parseInt(limit) : 10,
    );
    return { data, total: data.length };
  }

  @Get('cities')
  @ApiOperation({ summary: 'Get all cities with universities' })
  async getCities() {
    return this.universitiesService.getCities();
  }

  @Get('sync-status')
  @ApiOperation({ summary: 'Get YÖK Atlas sync status' })
  async getSyncStatus() {
    return this.universitiesService.getSyncStatus();
  }

  @Post('sync')
  @ApiOperation({ summary: 'Manually trigger YÖK Atlas sync' })
  async syncNow() {
    const result = await this.universitiesService.syncFromYokAtlas();
    return { success: true, ...result };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get university by ID' })
  async findOne(@Param('id') id: string) {
    return this.universitiesService.findById(id);
  }

  @Get(':id/departments')
  @ApiOperation({ summary: 'Get university departments' })
  async getDepartments(@Param('id') id: string) {
    const data = await this.universitiesService.getDepartments(id);
    return { data };
  }

  @Get(':id/faculties')
  @ApiOperation({ summary: 'Get university faculties' })
  @ApiQuery({ name: 'search', required: false })
  async getFaculties(
    @Param('id') universityId: string,
    @Query('search') search?: string,
  ) {
    const data = await this.universitiesService.searchFaculties(universityId, search);
    return { data, total: data.length };
  }
}

@ApiTags('faculties')
@Controller('faculties')
export class FacultiesController {
  constructor(private universitiesService: UniversitiesService) {}

  @Get(':id/departments')
  @ApiOperation({ summary: 'Get faculty departments' })
  @ApiQuery({ name: 'search', required: false })
  async getDepartments(
    @Param('id') facultyId: string,
    @Query('search') search?: string,
  ) {
    const data = await this.universitiesService.searchDepartments(
      undefined,
      facultyId,
      search,
    );
    return { data, total: data.length };
  }
}

@ApiTags('departments')
@Controller('departments')
export class DepartmentsController {
  constructor(private universitiesService: UniversitiesService) {}

  @Get(':id/courses')
  @ApiOperation({ summary: 'Get department courses' })
  async getCourses(@Param('id') id: string) {
    const data = await this.universitiesService.getCourses(id);
    return { data };
  }
}

@ApiTags('universiteler')
@Controller('universiteler')
export class UniversitelerTrController {
  constructor(private universitiesService: UniversitiesService) {}

  // Örnek: GET /api/v1/universiteler?search=muğla
  @Get()
  @ApiOperation({ summary: 'Üniversite ara (TR alias, autocomplete)' })
  @ApiQuery({ name: 'search', required: false })
  async searchTr(@Query('search') search?: string) {
    const q = search || '';
    const data = await this.universitiesService.searchUniversities(q, 15);
    // Örnek şema ile hizalı alan adları
    return data.map(u => ({ id: u.id, ad: u.name, sehir: u.city }));
  }

  // Örnek: GET /api/v1/universiteler/:id/fakulteler
  @Get(':id/fakulteler')
  @ApiOperation({ summary: 'Seçilen üniversitenin fakülteleri (TR alias)' })
  @ApiQuery({ name: 'search', required: false })
  async facultiesTr(@Param('id') id: string, @Query('search') search?: string) {
    const data = await this.universitiesService.searchFaculties(id, search, 50);
    return data.map(f => ({ id: f.id, ad: f.name }));
  }
}

@ApiTags('fakulteler')
@Controller('fakulteler')
export class FakultelerTrController {
  constructor(private universitiesService: UniversitiesService) {}

  // Örnek: GET /api/v1/fakulteler/:id/bolumler
  @Get(':id/bolumler')
  @ApiOperation({ summary: 'Seçilen fakültenin bölümleri (TR alias)' })
  @ApiQuery({ name: 'search', required: false })
  async departmentsTr(@Param('id') id: string, @Query('search') search?: string) {
    const data = await this.universitiesService.searchDepartments(undefined, id, search, 100);
    return data.map(d => ({ id: d.id, ad: d.name }));
  }
}
