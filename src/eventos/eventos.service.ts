import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';
import { CreateEventDTO, UpdateEventDTO } from 'src/dto/event.dto';
import { Event } from 'src/entities/event.entities';
import { Repository } from 'typeorm';
import { v2 as cloudinary } from 'cloudinary';
import { promisify } from 'util';
import * as fs from 'fs';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
const unlinkAsync = promisify(fs.unlink);

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly cloudinaryService: CloudinaryService,
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

  async create(
    body: CreateEventDTO,
    img?: Express.Multer.File,
  ): Promise<Event> {
    try {
      const imgUrl = img
        ? await this.cloudinaryService.uploadImage(img, 'events')
        : null;

      const event = { ...body, img: imgUrl };
      const newEvent = this.eventRepository.create(event);
      this.eventsCreatedCounter.inc(); // Incrementa el contador
      return this.eventRepository.save(newEvent);
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error while creating the Event',
        details: error.message,
      });
    }
  }
  async update(
    id: string,
    body: UpdateEventDTO,
    img?: Express.Multer.File,
  ): Promise<Event> {
    try {
      const event = await this.eventRepository.findOne({ where: { id } });
      if (!event) {
        throw new InternalServerErrorException({
          message: 'Event not found',
          details: `Event with id ${id} not found`,
        });
      }
      const imgUrl = img
        ? await this.cloudinaryService.uploadImage(img, 'events')
        : event.img;
      const data = { ...body, img: imgUrl };
      Object.assign(event, {
        ...body,
        img: imgUrl,
      });
      return this.eventRepository.save(event);
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error while updating the Event',
        details: error.message,
      });
    }
  }

  async remove(id: string): Promise<string> {
    try {
      const event = await this.eventRepository.findOne({ where: { id } });
      if (event) {
        await this.eventRepository.remove(event);
        return 'Event removed';
      } else {
        throw new InternalServerErrorException({
          message: 'Event not found',
          details: `Event with id ${id} not found`,
        });
      }
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error while removing the Event',
        details: error.message,
      });
    }
  }
}
