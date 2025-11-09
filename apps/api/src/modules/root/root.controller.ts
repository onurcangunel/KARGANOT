import { Controller, Get } from '@nestjs/common';

@Controller()
export class RootController {
  @Get()
  index() {
    return {
      name: 'KARGA NOT API',
      status: 'ok',
      version: '1.0.0',
  docs: '/api/docs',
  health: '/api/v1/health',
    };
  }
}
