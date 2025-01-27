import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'This is the backend endpoints for Happ3n! check our docs';
  }
}
