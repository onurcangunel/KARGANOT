import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { YokAtlasService } from './yok-atlas.service';

@ApiTags('yok-atlas')
@Controller('yok-atlas')
export class YokAtlasController {
  constructor(private readonly yokAtlasService: YokAtlasService) {}

  @Get('universities')
  @ApiOperation({ summary: 'Get all universities from YÖK Atlas' })
  async getUniversities() {
    const data = await this.yokAtlasService.getUniversities();
    return {
      success: true,
      data,
      total: data.length,
    };
  }

  @Get('faculties')
  @ApiOperation({ summary: 'Get faculties by university name' })
  @ApiQuery({ name: 'universityName', required: true })
  async getFaculties(@Query('universityName') universityName: string) {
    const data = await this.yokAtlasService.getFaculties(universityName);
    return {
      success: true,
      data,
      total: data.length,
    };
  }

  @Get('departments')
  @ApiOperation({ summary: 'Get departments by university and faculty' })
  @ApiQuery({ name: 'universityName', required: true })
  @ApiQuery({ name: 'facultyName', required: true })
  async getDepartments(
    @Query('universityName') universityName: string,
    @Query('facultyName') facultyName: string,
  ) {
    const data = await this.yokAtlasService.getDepartments(
      universityName,
      facultyName,
    );
    return {
      success: true,
      data,
      total: data.length,
    };
  }

  @Get('search')
  @ApiOperation({ summary: 'Search in YÖK Atlas database' })
  @ApiQuery({ name: 'q', required: false, description: 'General search query' })
  @ApiQuery({ name: 'uni_adi', required: false, description: 'University name' })
  @ApiQuery({ name: 'program_adi', required: false, description: 'Program name' })
  @ApiQuery({ name: 'sehir', required: false, description: 'City name' })
  @ApiQuery({ name: 'limit', required: false, description: 'Result limit' })
  async search(
    @Query('q') q?: string,
    @Query('uni_adi') uni_adi?: string,
    @Query('program_adi') program_adi?: string,
    @Query('sehir') sehir?: string,
    @Query('limit') limit?: string,
  ) {
    const data = await this.yokAtlasService.search({
      q,
      uni_adi,
      program_adi,
      sehir,
      limit: limit ? parseInt(limit) : 100,
    });
    return {
      success: true,
      data,
      total: data.length,
    };
  }
}
