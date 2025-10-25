import { Module } from '@nestjs/common';
import { UniversitiesController, FacultiesController } from './universities.controller';
import { UniversitiesService } from './universities.service';
import { YokAtlasController } from './yok-atlas.controller';
import { YokAtlasService } from './yok-atlas.service';

@Module({
  controllers: [UniversitiesController, FacultiesController, YokAtlasController],
  providers: [UniversitiesService, YokAtlasService],
  exports: [UniversitiesService, YokAtlasService],
})
export class UniversitiesModule {}
