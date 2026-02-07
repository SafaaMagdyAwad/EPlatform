import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import authRouter from "./routes/auth.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

/* ================= Middleware ================= */
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/* ================= Database ================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Error:", err));


/* ================= Routes ================= */

// Health check
app.get("/", (req, res) => {
  res.json({ status: "API is running 🚀" });
});

app.use('/api/auth',authRouter)


/* ================= Swagger ================= */

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* ================= Error Handling ================= */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server Error" });
});

/* ================= Server ================= */
app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});
