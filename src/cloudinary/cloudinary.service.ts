import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { unlink } from 'fs/promises';
import * as fs from 'fs';
import { promisify } from 'util';
import { Express } from 'express';
const unlinkAsync = promisify(fs.unlink);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
    folder: string,
  ): Promise<string> {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder,
        quality: 'auto', // Optimización automática
        format: 'webp', // Formato de salida
        width: 800, // Ancho máximo
        crop: 'scale', // Escalamos la imagen
        dpr: 'auto', //Densidad de pixeles para Pantalla Retina
      });

      await this.removeTempFile(file.path);
      return result.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Image upload failed');
    }
  }

  private async removeTempFile(filePath: string): Promise<void> {
    try {
      await unlink(filePath);
    } catch (error) {
      console.error('Error deleting temp file:', error);
    }
  }
}
