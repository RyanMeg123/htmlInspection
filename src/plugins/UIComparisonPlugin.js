import { ImageComparison } from '../utils/imageComparison.js';

export class UIComparisonPlugin {
  constructor(baselineImage) {
    this.baselineImage = baselineImage;
  }

  async inspect(page) {
    const screenshot = await page.screenshot({
      fullPage: true,
      encoding: 'binary'
    });

    const comparison = await ImageComparison.compareScreenshots(
      this.baselineImage,
      screenshot
    );

    return {
      type: 'ui_comparison',
      matches: comparison.matches,
      details: {
        similarity: comparison.similarity,
        diffImage: comparison.diffImage
      }
    };
  }
}