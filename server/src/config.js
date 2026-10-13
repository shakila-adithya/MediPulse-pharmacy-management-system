import "dotenv/config";

const requiredInProduction = ["DATABASE_URL", "SESSION_SECRET"];

if (process.env.NODE_ENV === "production") {
  const missing = requiredInProduction.filter((key) => !process.env[key]);
  if (missing.length) throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
}

export const config = {
  port: Number(process.env.PORT || 4000),
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  sessionSecret: process.env.SESSION_SECRET || "development-only-session-secret",
  isProduction: process.env.NODE_ENV === "production",
};
