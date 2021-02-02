class AppError extends Error {
  getStatusCode() {
    throw new Error('not implemented');
  }
}

module.exports = AppError;
