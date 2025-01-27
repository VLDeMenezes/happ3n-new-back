import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

@Controller('events')
export class EventsController {
  @Get()
  findAll() {
    return 'Devuelve todos los eventos';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Devuelve el evento con ID: ${id}`;
  }

  @Post('create')
  create(@Body() createChannelDto: any) {
    return 'Crea un evento';
  }

  @Put('modify/:id')
  modify(@Param('id') id: string, @Body() modifyChannelDto: any) {
    return `Modifica el evento con ID: ${id}`;
  }

  @Delete('destroy/:id')
  destroy(@Param('id') id: string) {
    return `Elimina la visibilidad del evento con ID: ${id}`;
  }
}
