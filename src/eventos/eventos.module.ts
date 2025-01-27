import { Module } from '@nestjs/common';
import { EventsController } from './eventos.controller';
import { EventosService } from './eventos.service';
import { MetricsModule } from 'src/metrics/metrics.module';

@Module({
  imports: [MetricsModule],
  controllers: [EventsController],
  providers: [EventosService],
})
export class EventosModule {}
