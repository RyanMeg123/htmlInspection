export class InspectionError extends Error {
  constructor(message, plugin) {
    super(message);
    this.name = 'InspectionError';
    this.plugin = plugin;
  }
}

export class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
  }
}