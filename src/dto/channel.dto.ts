import { IsString, IsArray, IsOptional, min, minLength } from 'class-validator';

export class CreateChannelDto {
  @IsString()
  channelName: string;

  @IsOptional()
  @IsString()
  background: string;

  @IsString()
  location: string;

  @IsArray()
  tags: string[];

  @IsString()
  about: string;

  @IsOptional()
  @IsArray()
  social: any[];

  @IsOptional()
  @IsArray()
  events: any[];

  @IsOptional()
  @IsString()
  avatar: string;

  @IsOptional()
  data: any;

  @IsOptional()
  banners: any[];

  @IsOptional()
  hubId: string;
}
