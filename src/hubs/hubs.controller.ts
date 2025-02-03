import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { HubsService } from './hubs.service';
import { Hub } from 'src/entities/hub.entities';
import { ApiTags } from '@nestjs/swagger';

@Controller('hubs')
@ApiTags('Hubs')
export class HubsController {
  constructor(private readonly hubsService: HubsService) {}

  @Get()
  findAll(): Promise<Hub[]> {
    return this.hubsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Hub> {
    return this.hubsService.findOne(id);
  }

  @Post('create')
  create(@Body() createChannelDto: Partial<Hub>): Promise<Hub> {
    return this.hubsService.create(createChannelDto);
  }

  @Put('modify/:id')
  modify(
    @Param('id') id: string,
    @Body() modifyChannelDto: Partial<Hub>,
  ): Promise<Hub> {
    return this.hubsService.update(id, modifyChannelDto);
  }

  @Delete('destroy/:id')
  destroy(@Param('id') id: string): Promise<Hub> {
    return this.hubsService.remove(id);
  }
}
