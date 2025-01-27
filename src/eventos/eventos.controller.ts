import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { EventosService } from './eventos.service';
import { Event } from 'src/entities/event.entities';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEventDTO } from 'src/dto/event.dto';
@ApiTags('Events')
@Controller('events')
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
  @ApiOperation({ summary: 'Create an Event' })
  @ApiBody({ type: CreateEventDTO })
  @ApiResponse({
    status: 201,
    description: 'The Event has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createChannelDto: Partial<Event>): Promise<Event> {
    return this.eventsService.create(createChannelDto);
  }

  @Put('modify/:id')
  @ApiOperation({ summary: 'Modify an Event' })
  modify(
    @Param('id') id: string,
    @Body() modifyChannelDto: Partial<Event>,
  ): Promise<Event> {
    return this.eventsService.update(id, modifyChannelDto);
  }

  @Delete('destroy/:id')
  @ApiOperation({ summary: 'Delete an Event' })
  destroy(@Param('id') id: string): Promise<Event> {
    return this.eventsService.remove(id);
  }
}
