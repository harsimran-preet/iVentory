let spy = {};

async function hideError() {
  spy.error = jest.spyOn(console, "error").mockImplementation(() => {});
}

async function hideLog() {
  spy.log = jest.spyOn(console, "log").mockImplementation(() => {});
}

async function hideDebug() {
  spy.debug = jest.spyOn(console, "debug").mockImplementation(() => {});
}

async function errorClear() {
  if (spy.error) spy.error.mockClear(() => {});
}

async function logClear() {
  if (spy.log) spy.log.mockClear(() => {});
}

async function debugClear() {
  if (spy.debug) spy.debug.mockClear(() => {});
}

async function restore() {
  if (spy.err) spy.log.mockRestore();
  if (spy.log) spy.log.mockRestore();
  if (spy.debug) spy.debug.mockRestore();
}

spy.hideError = hideError;
spy.hideLog = hideLog;
spy.hideDebug = hideDebug;
spy.errorClear = errorClear;
spy.logClear = logClear;
spy.debugClear = debugClear;
spy.restore = restore;

module.exports = spy;
