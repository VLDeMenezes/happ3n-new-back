import { Injectable } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

@Injectable()
export class AppService {
  @ApiResponse({
    status: 200,
    description: 'Return a welcome message and API description',
  })
  getHello(): string {
    return 'This is the backend endpoints for Happ3n! check our docs';
  }
}
