import puppeteer from 'puppeteer';
import { DEFAULT_TIMEOUT } from '../config/constants.js';

export class Browser {
  constructor(options = {}) {
    this.browser = null;
    this.page = null;
    this.options = {
      timeout: options.timeout || DEFAULT_TIMEOUT,
      viewport: options.viewport || { width: 1920, height: 1080 }
    };
  }

  async initialize() {
    this.browser = await puppeteer.launch({
      headless: 'new',
      defaultViewport: this.options.viewport
    });
    this.page = await this.browser.newPage();
    await this.page.setViewport(this.options.viewport);
  }

  async loadPage(url) {
    await this.page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: this.options.timeout
    });
    return this.page;
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}