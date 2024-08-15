export const handleUncaughtException = () => {
  process.on("uncaughtException", (err) => {
    console.error(`Uncaught Exception: ${err.message}`);
    // Optionally log the stack trace
    console.error(err.stack);
    process.exit(1); // Exit process with failure
  });
};

export const handleUnhandledRejection = () => {
  process.on("unhandledRejection", (reason, promise) => {
    console.error(`Unhandled Rejection at: ${promise}`);
    console.error(`Reason: ${reason.message}`);
    // Optionally log the stack trace
    console.error(reason.stack);
    process.exit(1); // Exit process with failure
  });
};
