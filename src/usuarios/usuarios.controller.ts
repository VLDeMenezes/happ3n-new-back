import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    this.findAll();
    return 'Devuelve todos los Users';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.findOne(id);
    return `Devuelve el User con ID: ${id}`;
  }

  @Post('create')
  create(@Body() createChannelDto: any) {
    this.create(createChannelDto);
    return 'Crea un User';
  }

  @Put('modify/:id')
  modify(@Param('id') id: string, @Body() modifyChannelDto: any) {
    this.modify(id, modifyChannelDto);
    return `Modifica el User con ID: ${id}`;
  }

  @Delete('destroy/:id')
  destroy(@Param('id') id: string) {
    this.destroy(id);
    return `Elimina la visibilidad del User con ID: ${id}`;
  }
}
