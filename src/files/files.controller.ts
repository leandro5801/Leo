import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('images')
  @UseInterceptors(FileInterceptor('file',{fileFilter:fileFilter,storage:diskStorage({destination:'./static/images',filename:fileNamer})}))
  uploadFile(@UploadedFile() files: Express.Multer.File){
    if(!files)
    throw new BadRequestException("Make sure that file is an image");
  const secureURL=`${files.filename}`
    return {secureURL};
  }

  @Get('image/:id')
  findOneImage(@Param('id') id:string){
    return this.filesService.findOneImage(id)

  }
}
