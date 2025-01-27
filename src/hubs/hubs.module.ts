import { Module } from '@nestjs/common';
import { HubsController } from './hubs.controller';
import { HubsService } from './hubs.service';
import { MetricsModule } from 'src/metrics/metrics.module';
import { Hub } from 'src/entities/hub.entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [MetricsModule, TypeOrmModule.forFeature([Hub])],
  controllers: [HubsController],
  providers: [HubsService],
})
export class HubsModule {}
