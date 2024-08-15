// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    // Include stack trace only in development mode
    stack: process.env.NODE_ENV === "development" ? null : err.stack,
  });
};

export { errorHandler };
