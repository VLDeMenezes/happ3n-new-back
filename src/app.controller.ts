import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Ruta base
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Ruta para el estado de la aplicación (opcional)
  @Get('status')
  getStatus(): { status: string } {
    return { status: 'API is running 🚀' };
  }
}
