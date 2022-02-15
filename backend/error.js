function catchAsync(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
}

function validationHandler(err, req, res, next) {
  {
    if (
      err.message.startsWith("User validation failed:") ||
      err.message.startsWith("Inventory validation failed: ")
    ) {
      console.error("Validation Handler: ");
      console.error(err);
      res.status(400);
      res.json({ error: err.message });
      res.end();
      return;
    }
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  console.error("Error Handler: ");
  console.error(err);
  res.status(500);
  res.json({ error: err.message });
  res.end();
  return;
}

exports.validationHandler = validationHandler;
exports.errorHandler = errorHandler;
exports.catchAsync = catchAsync;
