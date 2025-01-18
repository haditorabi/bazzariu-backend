import { Module } from '@nestjs/common';
import { MediasService } from './medias.service';
import { MediasResolver } from './medias.resolver';

@Module({
  providers: [MediasService, MediasResolver]
})
export class MediasModule {}
