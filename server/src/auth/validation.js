import { z } from "zod";

const email = z.string().trim().toLowerCase().email("Enter a valid email address.");
const phone = z.string().trim().min(7, "Enter a valid phone number.").max(30);
const password = z.string().min(8, "Password must be at least 8 characters.");

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Full name must be at least 2 characters.").max(120),
  email,
  phone,
  password,
  confirmPassword: z.string(),
  role: z.enum(["customer", "pharmacy"]),
}).refine((value) => value.password === value.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match.",
});

export const loginSchema = z.object({ email, password });
