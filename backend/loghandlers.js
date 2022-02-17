function requestLogger(req, res, next) {
  console.debug("%s %s\n%s", req.method, req.originalUrl, req.body);
  next();
}

exports.requestLogger = requestLogger;
