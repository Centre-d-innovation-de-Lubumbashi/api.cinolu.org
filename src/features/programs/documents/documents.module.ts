import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { ProgramDocument } from './entities/document.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramDocument])],
  controllers: [DocumentsController],
  providers: [DocumentsService]
})
export class ProgramDocumentsModule {}