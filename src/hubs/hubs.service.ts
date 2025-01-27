import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';
import { Hub } from 'src/entities/hub.entities';
import { Repository } from 'typeorm';

@Injectable()
export class HubsService {
  constructor(
    @InjectRepository(Hub)
    private readonly hubRepository: Repository<Hub>,
    @InjectMetric('HubsCreated')
    private readonly hubsCreatedCounter: Counter<string>,
    @InjectMetric('HubsFetchedById')
    private readonly hubsFetchedByIdCounter: Counter<string>,
  ) {}
  async findAll(): Promise<Hub[]> {
    return this.hubRepository.find();
  }

  async findOne(id: string): Promise<Hub> {
    this.hubsFetchedByIdCounter.inc(); // Incrementa el contador
    return this.hubRepository.findOne({ where: { id } });
  }

  async create(data: Partial<Hub>): Promise<Hub> {
    this.hubsCreatedCounter.inc(); // Incrementa el contador
    const newHub = this.hubRepository.create(data);
    return this.hubRepository.save(newHub);
  }

  async update(id: string, data: Partial<Hub>): Promise<Hub> {
    await this.hubRepository.update(id, data);
    return this.hubRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<Hub> {
    const Hub = await this.hubRepository.findOne({ where: { id } });
    if (Hub) {
      await this.hubRepository.remove(Hub);
    }
    return Hub;
  }
}
