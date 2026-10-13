import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { config } from "./config.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({ origin: config.clientOrigin, credentials: true }));
app.use(express.json({ limit: "20kb" }));
app.use(cookieParser());
app.use((request, response, next) => {
  const stateChanging = ["POST", "PUT", "PATCH", "DELETE"].includes(request.method);
  if (stateChanging && request.headers.origin && request.headers.origin !== config.clientOrigin) {
    return response.status(403).json({ message: "Origin not allowed." });
  }
  next();
});

app.get("/api/v1/health", (_request, response) => response.json({ status: "ok" }));
app.use("/api/v1/auth", authRoutes);

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ message: "An unexpected server error occurred." });
});

app.listen(config.port, () => console.log(`MediPulse API listening on port ${config.port}`));
