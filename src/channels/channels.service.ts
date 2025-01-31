import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import { promisify } from 'util';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';
import { CreateChannelDto } from 'src/dto/channel.dto';
import { Channel } from 'src/entities/channel.entities';
import { Repository } from 'typeorm';
import { Multer } from 'multer';

const unlinkAsync = promisify(fs.unlink);

cloudinary.config({
  cloud_name: 'dc3s16lku',
  api_key: '169859421985449',
  api_secret: '5vjhIfAPN4PLzDsWbnWIDwYjPkI',
});
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

  async uploadImage(file: any): Promise<string> {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'channels', // Carpeta en Cloudinary
    });
    await unlinkAsync(file.path); // Eliminar archivo temporal
    return result.secure_url;
  }
  async create(
    body: CreateChannelDto,
    avatar?: any,
    background?: any,
  ): Promise<Channel> {
    try {
      const avatarUrl = avatar ? await this.uploadImage(avatar) : null;
      const backgroundUrl = background
        ? await this.uploadImage(background)
        : null;
      const channel = { ...body, avatar: avatarUrl, background: backgroundUrl };
      console.log('Creating new channel with data:', channel);
      const newChannel = this.channelRepository.create(channel);
      this.channelsCreatedCounter.inc(); // Incrementa el contador
      return this.channelRepository.save(newChannel);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while creating the channel',
        error,
      );
    }
  }

  async update(
    id: string,
    body: Partial<Channel>,
    avatar?: any,
    background?: any,
  ): Promise<Channel> {
    const channel = await this.channelRepository.findOneBy({ id });
    if (!channel) throw new Error('Channel not found');
    const avatarUrl = avatar ? await this.uploadImage(avatar) : channel.avatar;
    const backgroundUrl = background
      ? await this.uploadImage(background)
      : channel.background;
    const updatedChannel = {
      ...channel,
      ...body,
      avatar: avatarUrl,
      background: backgroundUrl,
    };
    await this.channelRepository.update(id, updatedChannel);
    return this.channelRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<Channel> {
    const channel = await this.channelRepository.findOne({ where: { id } });
    if (channel) {
      await this.channelRepository.remove(channel);
    }
    return channel;
  }
}
