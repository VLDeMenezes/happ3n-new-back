import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';
import { Channel } from 'src/entities/channel.entities';
import { Repository } from 'typeorm';
@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
    @InjectMetric('ChannelsCreated')
    private readonly channelsCreatedCounter: Counter<string>,
    @InjectMetric('ChannelsFetchedById')
    private readonly channelsFetchedByIdCounter: Counter<string>,
  ) {}
  async findAll(): Promise<Channel[]> {
    return this.channelRepository.find();
  }

  async findOne(id: string): Promise<Channel> {
    this.channelsFetchedByIdCounter.inc(); // Incrementa el contador
    return this.channelRepository.findOne({ where: { id } });
  }

  async create(data: Partial<Channel>): Promise<Channel> {
    this.channelsCreatedCounter.inc(); // Incrementa el contador
    const newChannel = this.channelRepository.create(data);
    return this.channelRepository.save(newChannel);
  }

  async update(id: string, data: Partial<Channel>): Promise<Channel> {
    await this.channelRepository.update(id, data);
    return this.channelRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<Channel> {
    const channel = await this.channelRepository.findOne({ where: { id } });
    if (channel) {
      // Aquí puedes cambiar una propiedad como `isDeleted` en lugar de eliminar realmente
      await this.channelRepository.remove(channel);
    }
    return channel;
  }
}
