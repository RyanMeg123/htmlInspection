export class PluginManager {
  constructor() {
    this.plugins = new Map();
  }

  registerPlugin(name, plugin) {
    this.plugins.set(name, plugin);
  }

  getPlugin(name) {
    return this.plugins.get(name);
  }

  async runInspection(page) {
    const results = [];
    
    for (const [name, plugin] of this.plugins) {
      try {
        const result = await plugin.inspect(page);
        results.push({
          plugin: name,
          ...result
        });
      } catch (error) {
        results.push({
          plugin: name,
          error: error.message
        });
      }
    }

    return results;
  }
}