import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { Channel } from 'src/entities/channel.entities';
import { CreateChannelDto, UpdateChannelDto } from 'src/dto/channel.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../multer';

@ApiTags('Channels')
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

  @Post()
  @ApiOperation({ summary: 'Create a new Channel' })
  @ApiBody({ type: CreateChannelDto })
  @ApiResponse({
    status: 201,
    description: 'The channel has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request, check data.' })
  @UseInterceptors(AnyFilesInterceptor(multerOptions))
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createChannelDto: CreateChannelDto,
  ): Promise<Channel> {
    const avatar = files?.find((file) => file.fieldname === 'avatar') || null;
    const background =
      files?.find((file) => file.fieldname === 'background') || null;

    return this.channelsService.create(createChannelDto, avatar, background);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a channel' })
  @ApiBody({ type: UpdateChannelDto })
  @ApiResponse({
    status: 200,
    description: 'The channel has been successfully modified.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request, check data.' })
  update(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() updateChannelDto: UpdateChannelDto,
  ): Promise<Channel> {
    const avatar = files?.find((file) => file.fieldname === 'avatar') || null;
    const background =
      files?.find((file) => file.fieldname === 'background') || null;
    return this.channelsService.update(id, updateChannelDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a channel' })
  @ApiResponse({
    status: 200,
    description: 'The channel has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Channel not found.' })
  remove(@Param('id') id: string): Promise<string> {
    return this.channelsService.remove(id);
  }
}
