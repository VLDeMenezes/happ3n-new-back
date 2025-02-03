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
import { EventosService } from './eventos.service';
import { Event } from 'src/entities/event.entities';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEventDTO, UpdateEventDTO } from 'src/dto/event.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../multer';
@Controller('events')
@ApiTags('Events')
export class EventsController {
  constructor(private readonly eventsService: EventosService) {}

  @Get()
  @ApiOperation({ summary: 'Get all events' })
  findAll(): Promise<Event[]> {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an event by ID' })
  findOne(@Param('id') id: string): Promise<Event> {
    return this.eventsService.findOne(id);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a new Event' })
  @ApiBody({ type: CreateEventDTO })
  @ApiResponse({
    status: 201,
    description: 'The Event has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request, check data.' })
  @UseInterceptors(AnyFilesInterceptor(multerOptions))
  async createEvent(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createEventDto: CreateEventDTO,
  ): Promise<Event> {
    const img = files.find((file) => file.fieldname === 'img');
    return this.eventsService.create(createEventDto, img);
  }

  @Put('modify/:id')
  @ApiOperation({ summary: 'Modify an Event' })
  @ApiBody({ type: CreateEventDTO })
  @ApiResponse({
    status: 201,
    description: 'The event has been successfully modified.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request, check data.' })
  modify(
    @Param('id') id: string,
    @Body() modifyChannelDto: UpdateEventDTO,
  ): Promise<Event> {
    return this.eventsService.update(id, modifyChannelDto);
  }

  @Delete('destroy/:id')
  @ApiOperation({ summary: 'Delete an Event' })
  destroy(@Param('id') id: string): Promise<string> {
    return this.eventsService.remove(id);
  }
}
