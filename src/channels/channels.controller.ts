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
import { CreateChannelDto } from 'src/dto/channel.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('channels')
@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all channels' })
  findAll(): Promise<Channel[]> {
    return this.channelsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a channel by ID' })
  findOne(@Param('id') id: string): Promise<Channel> {
    return this.channelsService.findOne(id);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a new channel' })
  @ApiBody({ type: CreateChannelDto })
  @ApiResponse({
    status: 201,
    description: 'The channel has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createChannelDto: CreateChannelDto): Promise<Channel> {
    return this.channelsService.create(createChannelDto);
  }

  @Put('modify/:id')
  @ApiOperation({ summary: 'Update a channel' })
  @ApiBody({ type: CreateChannelDto })
  @ApiResponse({
    status: 201,
    description: 'The channel has been successfully modified.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  modify(
    @Param('id') id: string,
    @Body() modifyChannelDto: Partial<Channel>,
  ): Promise<Channel> {
    return this.channelsService.update(id, modifyChannelDto);
  }

  @Delete('destroy/:id')
  @ApiOperation({ summary: 'Delete a channel' })
  destroy(@Param('id') id: string): Promise<Channel> {
    return this.channelsService.remove(id);
  }
}
