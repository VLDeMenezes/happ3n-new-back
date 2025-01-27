import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { Channel } from 'src/entities/channel.entities';

@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Get()
  findAll(): Promise<Channel[]> {
    return this.channelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Channel> {
    return this.channelsService.findOne(id);
  }

  @Post('create')
  create(@Body() createChannelDto: Partial<Channel>): Promise<Channel> {
    return this.channelsService.create(createChannelDto);
  }

  @Put('modify/:id')
  modify(
    @Param('id') id: string,
    @Body() modifyChannelDto: Partial<Channel>,
  ): Promise<Channel> {
    return this.channelsService.update(id, modifyChannelDto);
  }

  @Delete('destroy/:id')
  destroy(@Param('id') id: string): Promise<Channel> {
    return this.channelsService.remove(id);
  }
}
