export class NotFoundPlugin {
  async inspect(page) {
    const status = await page.evaluate(() => {
      return {
        status: document.title.includes('404') || 
                document.body.innerText.includes('404') ||
                document.body.innerText.toLowerCase().includes('not found'),
        statusCode: window.performance.getEntriesByType('navigation')[0].responseStatus
      };
    });

    return {
      type: '404_check',
      isNotFound: status.status || status.statusCode === 404,
      details: status
    };
  }
}