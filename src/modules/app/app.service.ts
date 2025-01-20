import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  livecheck(): string {
    return 'App is LIVE!';
  }
}
