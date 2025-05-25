import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import productRoutes from "./routes/productRoutes.js";
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";
import { StatusCodes } from "http-status-codes";

const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// APPLY ARCJET RATE-LIMIT TO ALL ROUTES
app.use(async (req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    return next();
  }

  try {
    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(StatusCodes.TOO_MANY_REQUESTS).json({
          error: "Too many requests",
        });
      } else if (decision.reason.isBot()) {
        res.status(StatusCodes.FORBIDDEN).json({
          error: "Bot Acess Denied",
        });
      } else {
        res.status(StatusCodes.FORBIDDEN).json({
          error: "Forbidden",
        });
      }
      return;
    }

    // CHECK FOR SPOOFED BOTS
    if (
      decision.results.some(
        (result) => result.reason.isBot() && result.reason.isSpoofed()
      )
    ) {
      res.status(StatusCodes.FORBIDDEN).json({
        error: "Spoofed Bot Detected",
      });
      return;
    }

    next();
  } catch (error) {
    console.log("Arcjet Error: ", error);
    next(error);
  }
});

// ROUTES
app.use("/api/products", productRoutes);

const initDB = async () => {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log("DB initialized sucessfully");
  } catch (error) {
    console.log("Error initDB", error);
  }
};

initDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
});
