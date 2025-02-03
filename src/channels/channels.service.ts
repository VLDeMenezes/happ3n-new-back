import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import { promisify } from 'util';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';
import { CreateChannelDto, UpdateChannelDto } from 'src/dto/channel.dto';
import { Channel } from 'src/entities/channel.entities';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

const unlinkAsync = promisify(fs.unlink);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
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

  async findAll(): Promise<Channel[]> {
    return this.channelRepository.find();
  }

  async findOne(id: string): Promise<Channel> {
    const channel = await this.channelRepository.findOne({ where: { id } });
    if (!channel) {
      throw new NotFoundException(`Channel with id ${id} not found`);
    }
    if (channel) this.channelsFetchedByIdCounter.inc();
    return channel;
  }
  private async removeTempFile(filePath: string): Promise<void> {
    try {
      await unlinkAsync(filePath);
    } catch (error) {
      console.error('Error deleting temp file:', error);
    }
  }
  async uploadImage(file: Express.Multer.File): Promise<string> {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'channels', // Carpeta en Cloudinary
      });

      await this.removeTempFile(file.path);
      return result.secure_url;
    } catch (error) {}
  }
  async create(
    body: CreateChannelDto,
    avatar?: Express.Multer.File,
    background?: Express.Multer.File,
  ): Promise<Channel> {
    try {
      const avatarUrl = avatar ? await this.uploadImage(avatar) : null;
      const backgroundUrl = background
        ? await this.uploadImage(background)
        : null;
      const channel = { ...body, avatar: avatarUrl, background: backgroundUrl };

      const newChannel = this.channelRepository.create(channel);
      this.channelsCreatedCounter.inc();
      return this.channelRepository.save(newChannel);
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error while creating the channel',
        details: error.message,
      });
    }
  }

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
      const avatarUrl = avatar
        ? await this.uploadImage(avatar)
        : channel.avatar;
      const backgroundUrl = background
        ? await this.uploadImage(background)
        : channel.background;

      Object.assign(channel, {
        ...body,
        avatar: avatarUrl,
        background: backgroundUrl,
      });

      return this.channelRepository.save(channel);
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error while updating the channel',
        details: error.message,
      });
    }
  }

  async remove(id: string): Promise<string> {
    try {
      const channel = await this.channelRepository.findOne({ where: { id } });
      if (channel) {
        await this.channelRepository.remove(channel);
        return 'Channel removed';
      } else {
        throw new InternalServerErrorException({
          message: 'Channel not found',
          details: `Channel with id ${id} not found`,
        });
      }
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error while removing the channel',
        details: error.message,
      });
    }
  }
}
