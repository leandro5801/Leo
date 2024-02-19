import { BadRequestException } from '@nestjs/common';

export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  console.log({ file });
  if (!file) return callback(new Error('No files were uploaded'), false);

  const fileExtension = file.mimetype.split('/')[1];
  const valiExtension = ['jpeg', 'png', 'jpg', 'gif'];

  if (valiExtension.includes(fileExtension)) return callback(null, true);

  callback(null, false);
};
