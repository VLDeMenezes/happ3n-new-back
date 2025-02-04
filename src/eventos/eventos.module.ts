import { Module } from '@nestjs/common';
import { EventsController } from './eventos.controller';
import { EventosService } from './eventos.service';
import { MetricsModule } from 'src/metrics/metrics.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [MetricsModule, CloudinaryModule, TypeOrmModule.forFeature([Event])],
  controllers: [EventsController],
  providers: [EventosService],
})
export class EventosModule {}
