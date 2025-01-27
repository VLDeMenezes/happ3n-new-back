import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  IsOptional,
  IsDate,
  isString,
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
  @ApiProperty({ description: 'Channel owner' })
  channel: string;

  @IsString()
  @ApiProperty({ description: 'Location of the event' })
  location: string;

  @IsArray()
  @ApiProperty({ description: 'Type of the event' })
  eventType: string;

  @IsDate()
  @ApiProperty({ description: 'Start date of the event' })
  startDate: Date;

  @IsDate()
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

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Price of the event', required: false })
  price: string;

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
