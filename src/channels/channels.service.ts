import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';
import { Repository } from 'typeorm';
import { CreateChannelDto, UpdateChannelDto } from 'src/dto/channel.dto';
import { Channel } from 'src/entities/channel.entities';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
    private readonly cloudinaryService: CloudinaryService,
    @InjectMetric('ChannelsCreated')
    private readonly channelsCreatedCounter: Counter<string>,
    @InjectMetric('ChannelsFetchedById')
    private readonly channelsFetchedByIdCounter: Counter<string>,
  ) {}

  /**
   * Obtiene todos los canales disponibles en la base de datos.
   */
  async findAll(): Promise<Channel[]> {
    return this.channelRepository.find();
  }

  /**
   * Busca un canal por ID.
   * @param id Identificador del canal.
   * @throws NotFoundException si no se encuentra el canal.
   */
  async findOne(id: string): Promise<Channel> {
    const channel = await this.channelRepository.findOne({ where: { id } });
    if (!channel) {
      throw new NotFoundException(`Channel with id ${id} not found`);
    }
    this.channelsFetchedByIdCounter.inc(); // Incrementa el contador
    return channel;
  }

  /**
   * Crea un nuevo canal con opción de agregar imágenes.
   * @param body Datos del canal.
   * @param avatar Imagen de avatar (opcional).
   * @param background Imagen de fondo (opcional).
   */
  async create(
    body: CreateChannelDto,
    avatar?: Express.Multer.File,
    background?: Express.Multer.File,
  ): Promise<Channel> {
    try {
      const avatarUrl = avatar
        ? await this.cloudinaryService.uploadImage(avatar, 'channels')
        : null;
      const backgroundUrl = background
        ? await this.cloudinaryService.uploadImage(background, 'channels')
        : null;
      const newChannel = this.channelRepository.create({
        ...body,
        avatar: avatarUrl,
        background: backgroundUrl,
      });
      this.channelsCreatedCounter.inc(); // Incrementa el contador
      return this.channelRepository.save(newChannel);
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error while creating the channel',
        details: error.message,
      });
    }
  }

  /**
   * Actualiza un canal existente.
   * @param id Identificador del canal.
   * @param body Datos a actualizar.
   * @param avatar Imagen de avatar (opcional).
   * @param background Imagen de fondo (opcional).
   */
  async update(
    id: string,
    body: UpdateChannelDto,
    avatar?: Express.Multer.File,
    background?: Express.Multer.File,
  ): Promise<Channel> {
    try {
      const channel = await this.channelRepository.findOneBy({ id });
      if (!channel) {
        throw new NotFoundException(`Channel with id ${id} not found`);
      }

      Object.assign(channel, {
        ...body,
        avatar: avatar
          ? await this.cloudinaryService.uploadImage(avatar, 'channels')
          : channel.avatar,
        background: background
          ? await this.cloudinaryService.uploadImage(background, 'channels')
          : channel.background,
      });

      return this.channelRepository.save(channel);
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error while updating the channel',
        details: error.message,
      });
    }
  }

  /**
   * Elimina un canal de la base de datos.
   * @param id Identificador del canal.
   * @throws NotFoundException si el canal no existe.
   */
  async remove(id: string): Promise<string> {
    try {
      const channel = await this.channelRepository.findOne({ where: { id } });
      if (!channel) {
        throw new NotFoundException(`Channel with id ${id} not found`);
      }
      await this.channelRepository.remove(channel);
      return 'Channel removed';
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error while removing the channel',
        details: error.message,
      });
    }
  }
}
