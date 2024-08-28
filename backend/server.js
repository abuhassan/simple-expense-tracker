import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorMiddleware.js";
import {
  handleUncaughtException,
  handleUnhandledRejection,
} from "./middleware/globalErrorHandler.js";
import connectDB from "./config/db.js";
import users from "./routes/userRoutes.js";

dotenv.config();

connectDB();

import transactions from "./routes/transactions.js";
import organizationRoutes from "./routes/organizationRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/transactions", transactions);
app.use("/api/users", users);
app.use("/api/organizations", organizationRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

// Handle shutdown and other process events
process.on("SIGINT", () => {
  console.log("SIGINT signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed.");
    process.exit(0);
  });
});

// Listen for unhandled rejections and uncaught exceptions.
process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);
  server.close(() => {
    process.exit(1); // Exit after closing the server
  });
});
