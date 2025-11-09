import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  getHealth() {
    return { 
      name: 'KARGA NOT API',
      status: 'ok', 
      version: '1.0.0',
      timestamp: new Date().toISOString() 
    };
  }
}
