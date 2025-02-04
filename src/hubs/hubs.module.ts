import { Module } from '@nestjs/common';
import { HubsController } from './hubs.controller';
import { HubsService } from './hubs.service';
import { MetricsModule } from 'src/metrics/metrics.module';
import { Hub } from 'src/entities/hub.entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [MetricsModule, TypeOrmModule.forFeature([Hub]), CloudinaryModule],
  controllers: [HubsController],
  providers: [HubsService],
})
export class HubsModule {}
