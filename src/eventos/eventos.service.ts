import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';
import { Event } from 'src/entities/event.entities';
import { Repository } from 'typeorm';

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectMetric('EventsCreated')
    private readonly eventsCreatedCounter: Counter<string>,
    @InjectMetric('EventsFetchedById')
    private readonly eventsFetchedByIdCounter: Counter<string>,
  ) {}
  async findAll(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  async findOne(id: string): Promise<Event> {
    this.eventsFetchedByIdCounter.inc(); // Incrementa el contador
    return this.eventRepository.findOne({ where: { id } });
  }

  async create(data: Partial<Event>): Promise<Event> {
    this.eventsCreatedCounter.inc(); // Incrementa el contador
    const newEvent = this.eventRepository.create(data);
    return this.eventRepository.save(newEvent);
  }
  async update(id: string, data: Partial<Event>): Promise<Event> {
    await this.eventRepository.update(id, data);
    return this.eventRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (event) {
      await this.eventRepository.remove(event);
    }
    return event;
  }
}
