import { Module } from '@nestjs/common';
import { ChannelsController } from './channels.controller';
import { ChannelsService } from './channels.service';
import { MetricsModule } from 'src/metrics/metrics.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from 'src/entities/channel.entities';

@Module({
  imports: [MetricsModule, TypeOrmModule.forFeature([Channel])],
  controllers: [ChannelsController],
  providers: [ChannelsService],
})
export class ChannelsModule {}
