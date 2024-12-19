export class ResourceSizePlugin {
  constructor(sizeLimit = 5 * 1024 * 1024) { // 5MB default limit
    this.sizeLimit = sizeLimit;
  }

  async inspect(page) {
    const resources = await page.evaluate(() => {
      return performance.getEntriesByType('resource').map(resource => ({
        url: resource.name,
        size: resource.transferSize,
        type: resource.initiatorType
      }));
    });

    const largeResources = resources.filter(resource => 
      resource.size > this.sizeLimit
    );

    return {
      type: 'resource_size_check',
      hasLargeResources: largeResources.length > 0,
      details: {
        largeResources,
        totalResources: resources.length,
        sizeLimit: this.sizeLimit
      }
    };
  }
}