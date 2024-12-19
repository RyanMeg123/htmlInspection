import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { DEFAULT_SIMILARITY_THRESHOLD } from '../config/constants.js';

export class ImageComparison {
  static async compareScreenshots(img1Buffer, img2Buffer) {
    const img1 = PNG.sync.read(img1Buffer);
    const img2 = PNG.sync.read(img2Buffer);
    
    const { width, height } = img1;
    const diff = new PNG({ width, height });
    
    const mismatchedPixels = pixelmatch(
      img1.data,
      img2.data,
      diff.data,
      width,
      height,
      { threshold: 0.1 }
    );
    
    const similarity = 1 - (mismatchedPixels / (width * height));
    
    return {
      similarity,
      matches: similarity >= DEFAULT_SIMILARITY_THRESHOLD,
      diffImage: PNG.sync.write(diff)
    };
  }
}