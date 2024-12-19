import { Browser } from './core/Browser.js';
import { PluginManager } from './core/PluginManager.js';
import { TokenManager } from './utils/auth.js';
import { InspectionError, AuthenticationError } from './core/errors.js';
import * as plugins from './plugins/index.js';

export class Inspector {
  constructor(options = {}) {
    this.tokenManager = new TokenManager(options.secret || process.env.SECRET_KEY);
    this.browser = new Browser(options);
    this.pluginManager = new PluginManager();
    
    // Register default plugins
    this.registerDefaultPlugins();
  }

  registerDefaultPlugins() {
    this.pluginManager.registerPlugin('404_check', new plugins.NotFoundPlugin());
    this.pluginManager.registerPlugin('white_screen', new plugins.WhiteScreenPlugin());
    this.pluginManager.registerPlugin('resource_size', new plugins.ResourceSizePlugin());
  }

  async inspect(url, token) {
    // if (!this.tokenManager.verifyToken(token)) {
    //   throw new AuthenticationError('Invalid or expired token');
    // }

    try {
      await this.browser.initialize();
      const page = await this.browser.loadPage(url);
      return await this.pluginManager.runInspection(page);
    } catch (error) {
      throw new InspectionError(error.message, error.plugin);
    } finally {
      await this.browser.close();
    }
  }
}

// CLI support
if (process.argv[2]) {
  const inspector = new Inspector();
  inspector.inspect(process.argv[2])
    .then(results => console.log(JSON.stringify(results, null, 2)))
    .catch(console.error);
}

export { plugins };