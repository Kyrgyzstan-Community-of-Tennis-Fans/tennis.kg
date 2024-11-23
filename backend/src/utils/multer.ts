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

const mediaStorage = multer.diskStorage({
  destination: async (_, file, callback) => {
    const isVideo = file.mimetype.startsWith('video');
    const destDir = path.join(config.publicPath, isVideo ? 'videos' : 'images/imgCarousel');
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
      console.log(`Deleted file: ${imageName}`);
    }
  });
};

const fileStorage = multer.diskStorage({
  destination: async (_, __, callback) => {
    const destDir = path.join(config.publicPath, 'files');
    await fs.mkdir(destDir, { recursive: true });
    callback(null, config.publicPath);
  },
  filename: (_, file, callback) => {
    const extension = path.extname(file.originalname);
    const newFilename = randomUUID() + extension;
    callback(null, 'files/' + newFilename);
  },
});

export const MediaUpload = multer({ storage: mediaStorage });
export const imagesUpload = multer({ storage: imageStorage });
export const filesUpload = multer({ storage: fileStorage });
