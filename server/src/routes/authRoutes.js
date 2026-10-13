import { Router } from "express";
import rateLimit from "express-rate-limit";
import { login, logout, me, register } from "../auth/authController.js";

const router = Router();
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: "draft-8", legacyHeaders: false, message: { message: "Too many authentication attempts. Please try again later." } });

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.get("/me", me);
router.post("/logout", logout);

export default router;
