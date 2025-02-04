import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UploadedFiles,
} from '@nestjs/common';
import { HubsService } from './hubs.service';
import { Hub } from 'src/entities/hub.entities';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateHubDTO, UpdateHubDTO } from 'src/dto/hub.dto';
import { UpdateChannelDto } from 'src/dto/channel.dto';

@Controller('hubs')
@ApiTags('Hubs')
export class HubsController {
  constructor(private readonly hubsService: HubsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all hubs' })
  findAll(): Promise<Hub[]> {
    return this.hubsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an hub by ID' })
  findOne(@Param('id') id: string): Promise<Hub> {
    return this.hubsService.findOne(id);
  }

  @Post('')
  @ApiOperation({ summary: 'Create a new Hub' })
  @ApiBody({ type: CreateHubDTO })
  @ApiResponse({
    status: 201,
    description: 'The hub has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request, check data.' })
  create(
    @Body()
    @UploadedFiles()
    files: Express.Multer.File[],
    createHubDto: CreateHubDTO,
  ): Promise<Hub> {
    const background =
      files?.find((file) => file.fieldname === 'background') || null;
    return this.hubsService.create(createHubDto, background);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a hub' })
  @ApiBody({ type: UpdateHubDTO })
  @ApiResponse({
    status: 200,
    description: 'The hub has been successfully modified.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request, check data.' })
  update(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],

    @Body() updateHubDTO: UpdateHubDTO,
  ): Promise<Hub> {
    const background =
      files?.find((file) => file.fieldname === 'background') || null;
    return this.hubsService.update(id, updateHubDTO, background);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a hub' })
  @ApiResponse({
    status: 200,
    description: 'The hub has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'hub not found.' })
  remove(@Param('id') id: string): Promise<string> {
    return this.hubsService.remove(id);
  }
}
