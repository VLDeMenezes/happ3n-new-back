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
import { CreateHubDTO, UpdateHubDTO } from 'src/dto/hub.dto';

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
  create(@Body() createHubDto: CreateHubDTO): Promise<Hub> {
    return this.hubsService.create(createHubDto);
  }

  @Put('modify/:id')
  modify(
    @Param('id') id: string,
    @Body() updateHubDTO: UpdateHubDTO,
  ): Promise<Hub> {
    return this.hubsService.update(id, updateHubDTO);
  }

  @Delete('destroy/:id')
  destroy(@Param('id') id: string): Promise<string> {
    return this.hubsService.remove(id);
  }
}
