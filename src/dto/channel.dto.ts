import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional, min, minLength } from 'class-validator';

export class CreateChannelDto {
  @ApiProperty({ description: 'Name of the channel' })
  @IsString()
  channelName: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'img background of the channel' })
  background: string;

  @IsString()
  @ApiProperty({ description: 'Location of the channel' })
  location: string;

  @IsArray()
  @ApiProperty({ description: 'Tags of the channel' })
  tags: string[];

  @IsString()
  @ApiProperty({ description: 'Description of the channel' })
  about: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    description: 'Social Media links of the channel',
    required: false,
  })
  social: any[];

  @IsOptional()
  @IsArray()
  @ApiProperty({ description: 'Events of the channel', required: false })
  events: any[];

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Avatar of the channel', required: false })
  avatar: string;

  @IsOptional()
  @ApiProperty({ description: 'data trending of the channel', required: false })
  data: any;

  @IsOptional()
  @ApiProperty({
    description: 'Principals Banners of the channel',

    required: false,
  })
  banners: any[];

  @IsOptional()
  @ApiProperty({
    description: 'Hub Id if the channel have hubs',
    required: false,
  })
  hubId: string;
}
