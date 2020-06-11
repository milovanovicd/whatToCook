import { Injectable } from '@nestjs/common';

//Sva logika ide ove - Kontroleri treba da budu što čitljiviji
@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }
}
