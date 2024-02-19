import { BadRequestException, Injectable, Put } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';



@Injectable()
export class FilesService {
 
  findOneImage(id: string) {
    const path = join(__dirname,'../../static/images',id);

    if (!existsSync(path)) {
      throw new BadRequestException(`Could not find`)
    }
    return path
  }
  async uploadFile(file: Express.Multer.File) {
    return {file: file.originalname};
  }
} 

