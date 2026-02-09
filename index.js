import connectDB from "./config/db.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css";
import authRouter from "./routes/auth.routes.js";
import courseRouter from "./routes/cources.routes.js";
import userRouter from "./routes/user.routes.js";
import enrollmentRouter from "./routes/enrollment.routes.js";
import sectionRouter from "./routes/section.routes.js";
import lessonRouter from "./routes/lesson.routes.js";
import liveSessionRouter from "./routes/liveSession.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

/* ================= Middleware ================= */
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/* ================= Database ================= */

await connectDB();


/* ================= Routes ================= */

// Health check
app.get("/", (req, res) => {
  res.json({ status: "API is running 🚀" });
});

app.use('/api/auth',authRouter)
app.use('/api/courses',courseRouter)
app.use('/api/users',userRouter)
app.use('/api/enrollment',enrollmentRouter)
app.use('/api/sections',sectionRouter)
app.use('/api/lessons',lessonRouter)
app.use('/api/live-sessions',liveSessionRouter)


/* ================= Swagger ================= */

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCssUrl: CSS_URL,
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
  })
);
/* ================= Error Handling ================= */
app.use((err, req, res, next) => {
  console.error(" Error:", err);

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

/* ================= Server ================= */
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

export default app;
