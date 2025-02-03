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
const unlinkAsync = promisify(fs.unlink);

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
  private async removeTempFile(filePath: string): Promise<void> {
    try {
      await unlinkAsync(filePath);
    } catch (error) {
      console.error('Error deleting temp file:', error);
    }
  }
  async uploadImage(file: Express.Multer.File): Promise<string> {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'channels', // Carpeta en Cloudinary
    });
    await this.removeTempFile(file.path);
    return result.secure_url;
  }
  async create(
    body: CreateEventDTO,
    img?: Express.Multer.File,
  ): Promise<Event> {
    try {
      const imgUrl = img ? await this.uploadImage(img) : null;

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
      const imgUrl = img ? await this.uploadImage(img) : event.img;
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
