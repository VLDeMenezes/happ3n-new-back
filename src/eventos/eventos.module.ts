import { Module } from '@nestjs/common';
import { EventsController } from './eventos.controller';
import { EventosService } from './eventos.service';
import { MetricsModule } from 'src/metrics/metrics.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { Event } from 'src/entities/event.entities';
import { Channel } from 'src/entities/channel.entities';

@Module({
  imports: [
    MetricsModule,
    CloudinaryModule,
    TypeOrmModule.forFeature([Event, Channel]),
  ],
  controllers: [EventsController],
  providers: [EventosService],
})
export class EventosModule {}
