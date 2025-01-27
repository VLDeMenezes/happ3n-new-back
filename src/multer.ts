import { diskStorage } from 'multer';
import * as path from 'path';

export const multerOptions = {
  storage: diskStorage({
    destination: './uploads', // Carpeta temporal
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext).replace(/\s/g, '');
      console.log('Uploading file:', name);
      cb(null, `${name}-${Date.now()}${ext}`);
    },
  }),
};
