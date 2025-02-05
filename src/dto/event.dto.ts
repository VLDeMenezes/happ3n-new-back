import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  IsOptional,
  IsDate,
  IsBoolean,
} from 'class-validator';

export class CreateEventDTO {
  @ApiProperty({ description: 'Name of the event' })
  @IsString()
  eventName: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Img of the event', required: false })
  img: string;

  @IsString()
  @ApiProperty({ description: 'Channel owner id' })
  channelId: string;

  @IsString()
  @ApiProperty({ description: 'Location of the event' })
  location: string;

  @IsArray()
  @ApiProperty({ description: 'Type of the event' })
  eventType: string;

  @IsDate()
  @IsOptional()
  @ApiProperty({ description: 'Start date of the event' })
  startDate: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty({ description: 'End date of the event' })
  endDate: Date;

  @IsString()
  @ApiProperty({
    description: 'Media social links of the event',
    required: false,
  })
  sourceLink: string;

  @IsString()
  @ApiProperty({ description: 'Decription of the event' })
  description: string;

  @IsString()
  @ApiProperty({ description: 'Zone Horario of the event' })
  timeZone: string;

  @IsBoolean()
  @ApiProperty({ description: 'Is paid or free' })
  isPaid: Boolean;

  @IsArray()
  @ApiProperty({ description: 'Toppings of the event', type: [String] })
  toppings: string[];

  @IsArray()
  @IsOptional()
  @ApiProperty({
    description: 'Guest of the event',
    type: [String],
    required: false,
  })
  guest: string[];
}

export class UpdateEventDTO extends CreateEventDTO {}
