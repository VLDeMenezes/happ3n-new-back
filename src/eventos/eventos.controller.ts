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

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventosService) {}

  @Get()
  findAll(): Promise<Event[]> {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Event> {
    return this.eventsService.findOne(id);
  }

  @Post('create')
  create(@Body() createChannelDto: Partial<Event>): Promise<Event> {
    return this.eventsService.create(createChannelDto);
  }

  @Put('modify/:id')
  modify(
    @Param('id') id: string,
    @Body() modifyChannelDto: Partial<Event>,
  ): Promise<Event> {
    return this.eventsService.update(id, modifyChannelDto);
  }

  @Delete('destroy/:id')
  destroy(@Param('id') id: string): Promise<Event> {
    return this.eventsService.remove(id);
  }
}
