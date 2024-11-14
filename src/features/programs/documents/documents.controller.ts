import { Controller, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { UpdateProgramDto } from '../programs/dto/update-program.dto';
import { DocumentsService } from './documents.service';
import { ProgramDocument } from './entities/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { Rights } from '@core/modules/auth/decorators/rights.decorators';
import { RightsEnum } from '@core/modules/auth/enums/rights.enum';

@Controller('program-documents')
@Rights(RightsEnum.Staff)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get('')
  @Rights(RightsEnum.Guest)
  findAll(): Promise<{ data: ProgramDocument[] }> {
    return this.documentsService.findAll();
  }

  @Post('')
  create(@Body() createDocumentDto: CreateDocumentDto): Promise<{ data: ProgramDocument }> {
    return this.documentsService.create(createDocumentDto);
  }

  @Post('document/:id')
  @UseInterceptors(
    FileInterceptor('document', {
      storage: diskStorage({
        destination: './uploads/programs/documents',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  addFile(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<{ data: ProgramDocument }> {
    return this.documentsService.addFile(id, file);
  }

  @Delete('document/:id')
  removeFile(@Param('id') id: string): Promise<{ data: ProgramDocument }> {
    return this.documentsService.removeFile(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramDto: UpdateProgramDto): Promise<{ data: ProgramDocument }> {
    return this.documentsService.update(id, updateProgramDto);
  }

  @Post('restore/:id')
  restore(@Param('id') id: string): Promise<{ data: ProgramDocument }> {
    return this.documentsService.restore(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.documentsService.remove(id);
  }
}