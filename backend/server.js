import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

import transactions from "./routes/transactions.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/transactions", transactions);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
