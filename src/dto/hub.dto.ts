import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate } from 'class-validator';

export class CreateHubDTO {
  @ApiProperty({ description: 'Name of the hub' })
  @IsString()
  hubName: string;

  @IsOptional()
  @ApiProperty({ description: 'background img of the hub' })
  @IsString()
  background: string;

  @IsString()
  description: string;

  @IsDate()
  @ApiProperty({ description: 'Date of the hub' })
  date: Date;

  @IsString()
  @ApiProperty({ description: 'Location of the hub' })
  location: string;

  @IsString()
  @ApiProperty({ description: 'id of the hub' })
  idOwner: string;
  //TODO CHEQUEAR
}

export class UpdateHubDTO extends CreateHubDTO {}
