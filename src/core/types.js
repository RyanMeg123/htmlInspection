/**
 * @typedef {Object} InspectionResult
 * @property {string} plugin - Plugin name
 * @property {string} type - Check type
 * @property {boolean} success - Whether the check passed
 * @property {Object} details - Additional check details
 */

/**
 * @typedef {Object} PluginInterface
 * @property {function(import('puppeteer').Page): Promise<InspectionResult>} inspect
 */

export const Types = {};