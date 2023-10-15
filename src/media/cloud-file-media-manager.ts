import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    // Configure Cloudinary (you can set this up in your constructor or as an environment variable)
    cloudinary.config({
      cloud_name: this.configService.get<string>('cloud_name'),
      api_key: this.configService.get<string>('api_key'),
      api_secret: this.configService.get<string>('api_secret'),
    });
  }

  async uploadImage(file: Express.Multer.File, folder: string) {
    try {
      const fileData = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
      const result = await cloudinary.uploader.upload(fileData, {
        folder,
        resource_type: 'auto'
      });

      return { secure_url: result.secure_url, public_id: result.public_id };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteImage(imageUrls: string[]) {
    try {
      const result = await cloudinary.api.delete_resources(imageUrls, {
        type: "upload",
        resource_type: 'image'
      });

      return result;
    } catch (error) {
      throw new Error(error.error.message);
    }
  }
}