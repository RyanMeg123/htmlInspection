export class WhiteScreenPlugin {
  async inspect(page) {
    const analysis = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
      
      // Check if page is empty or only contains whitespace
      const isEmpty = body.children.length === 0 || 
                     body.innerText.trim().length === 0;
      
      // Check if page has background color
      const hasBackground = window.getComputedStyle(body).backgroundColor !== 'rgba(0, 0, 0, 0)' ||
                          window.getComputedStyle(html).backgroundColor !== 'rgba(0, 0, 0, 0)';
      
      return {
        isEmpty,
        hasBackground,
        childElements: body.children.length
      };
    });

    return {
      type: 'white_screen_check',
      isWhiteScreen: analysis.isEmpty && !analysis.hasBackground,
      details: analysis
    };
  }
}