import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

@Controller('hubs')
export class HubsController {
  @Get()
  findAll() {
    return 'Devuelve todos los Hubs';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Devuelve el Hub con ID: ${id}`;
  }

  @Post('create')
  create(@Body() createChannelDto: any) {
    return 'Crea un Hub';
  }

  @Put('modify/:id')
  modify(@Param('id') id: string, @Body() modifyChannelDto: any) {
    return `Modifica el Hub con ID: ${id}`;
  }

  @Delete('destroy/:id')
  destroy(@Param('id') id: string) {
    return `Elimina la visibilidad del Hub con ID: ${id}`;
  }
}
