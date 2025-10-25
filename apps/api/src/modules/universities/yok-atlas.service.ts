import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import {
  YokAtlasUniversity,
  YokAtlasFaculty,
  YokAtlasDepartment,
  YokAtlasSearchParams,
} from './yok-atlas.types';

@Injectable()
export class YokAtlasService {
  private readonly logger = new Logger(YokAtlasService.name);
  private readonly pythonApiUrl = process.env.PYTHON_API_URL || 'http://localhost:8000';

  /**
   * Üniversiteleri YÖK Atlas'tan getir
   */
  async getUniversities(): Promise<YokAtlasUniversity[]> {
    try {
      const response = await axios.get<YokAtlasUniversity[]>(
        `${this.pythonApiUrl}/universities`,
        { timeout: 120000 }
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to fetch universities: ${error.message}`);
      throw error;
    }
  }

  /**
   * Fakülteleri getir
   */
  async getFaculties(universityName: string): Promise<YokAtlasFaculty[]> {
    try {
      const response = await axios.get<YokAtlasFaculty[]>(
        `${this.pythonApiUrl}/faculties`,
        {
          params: { universityName },
          timeout: 30000
        }
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to fetch faculties: ${error.message}`);
      throw error;
    }
  }

  /**
   * Bölümleri getir
   */
  async getDepartments(
    universityName: string,
    facultyName: string
  ): Promise<YokAtlasDepartment[]> {
    try {
      const response = await axios.get<YokAtlasDepartment[]>(
        `${this.pythonApiUrl}/programs`,
        {
          params: { universityName, facultyName },
          timeout: 30000
        }
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to fetch departments: ${error.message}`);
      throw error;
    }
  }

  /**
   * Genel arama
   */
  async search(params: YokAtlasSearchParams): Promise<any[]> {
    try {
      const response = await axios.get(
        `${this.pythonApiUrl}/search`,
        {
          params,
          timeout: 30000
        }
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Search failed: ${error.message}`);
      throw error;
    }
  }
}
