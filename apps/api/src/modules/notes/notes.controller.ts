import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async list() {
    return this.notesService.list();
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.notesService.get(id);
  }

  @Post()
  async create(@Body() dto: { title: string; price?: number }) {
    return this.notesService.create(dto);
  }
}
