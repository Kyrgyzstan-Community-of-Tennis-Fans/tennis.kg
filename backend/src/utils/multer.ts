import multer from 'multer';
import path from 'path';
import { promises as fs } from 'fs';
import config from '../../config';
import { randomUUID } from 'crypto';
import { unlink } from 'node:fs';
import { resolve } from 'node:path';

const imageStorage = multer.diskStorage({
  destination: async (_, __, callback) => {
    const destDir = path.join(config.publicPath, 'images');
    await fs.mkdir(destDir, { recursive: true });
    callback(null, config.publicPath);
  },
  filename: (_, file, callback) => {
    const extension = path.extname(file.originalname);
    const newFilename = randomUUID() + extension;
    callback(null, 'images/' + newFilename);
  },
});

const imageCarousel = multer.diskStorage({
  destination: async (_, __, callback) => {
    const destDir = path.join(config.publicPath, 'images/imgCarousel');
    await fs.mkdir(destDir, { recursive: true });
    callback(null, destDir);
  },
  filename: (_, file, callback) => {
    const extension = path.extname(file.originalname);
    const newFilename = randomUUID() + extension;
    callback(null, newFilename);
  },
});

export const clearImages = (imageName: string) => {
  unlink(resolve(config.publicPath, imageName), (err) => {
    if (err) {
      console.log("File doesn't exist");
      throw err;
    } else {
      console.log('Deleted file!');
    }
  });
};

export const ImagesCarousel = multer({ storage: imageCarousel });
export const imagesUpload = multer({ storage: imageStorage });
