import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';
import { CreateEventDTO, UpdateEventDTO } from 'src/dto/event.dto';
import { Event } from 'src/entities/event.entities';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Channel } from 'src/entities/channel.entities';

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly channelRepository: Repository<Channel>,
    private readonly cloudinaryService: CloudinaryService,
    @InjectMetric('EventsCreated')
    private readonly eventsCreatedCounter: Counter<string>,
    @InjectMetric('EventsFetchedById')
    private readonly eventsFetchedByIdCounter: Counter<string>,
  ) {}

  /**
   * Obtiene todos los eventos disponibles en la base de datos.
   */
  async findAll(): Promise<Event[]> {
    return this.eventRepository.find();
  }
  /**
   * Busca un canal por ID.
   * @param id Identificador del canal.
   * @throws NotFoundException si no se encuentra el canal.
   */
  async findOne(id: string): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    this.eventsFetchedByIdCounter.inc(); // Incrementa el contador
    return event;
  }

  /**
   * Crea un nuevo evento con opción de agregar imágenes.
   * @param body Datos del evento.
   * @param img Imagen del evento (opcional).
   */
  async create(
    body: CreateEventDTO,
    img?: Express.Multer.File,
  ): Promise<Event> {
    try {
      const channel = await this.channelRepository.findOne({
        where: { id: body.channelId },
      });
      if (!channel) throw new NotFoundException('Channel not found');
      const imgUrl = img
        ? await this.cloudinaryService.uploadImage(img, 'events')
        : null;
      console.log(body);
      const newEvent = this.eventRepository.create({
        ...body,
        img: imgUrl,
      });
      this.eventsCreatedCounter.inc(); // Incrementa el contador
      return this.eventRepository.save(newEvent);
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error while creating the Event',
        details: error.message,
      });
    }
  }

  /**
   * Actualiza un evento existente.
   * @param id Identificador del canal.
   * @param body Datos a actualizar.
   * @param img Imagen del evento (opcional).
   */
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
      Object.assign(event, {
        ...body,
        img: img
          ? await this.cloudinaryService.uploadImage(img, 'events')
          : event.img,
      });

      return this.eventRepository.save(event);
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error while updating the Event',
        details: error.message,
      });
    }
  }
  /**
   * Elimina un evento de la base de datos.
   * @param id Identificador del evento.
   * @throws NotFoundException si el evento no existe.
   */
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
