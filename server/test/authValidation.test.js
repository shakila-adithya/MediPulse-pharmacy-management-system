import test from "node:test";
import assert from "node:assert/strict";
import { loginSchema, registerSchema } from "../src/auth/validation.js";

const baseRegistration = {
  name: "Shakila Adithya",
  email: "SHAKILA@example.com",
  phone: "+94 77 123 4567",
  password: "strong-password",
  confirmPassword: "strong-password",
  role: "customer",
};

test("registration normalizes valid email and accepts customer accounts", () => {
  const result = registerSchema.safeParse(baseRegistration);
  assert.equal(result.success, true);
  assert.equal(result.data.email, "shakila@example.com");
});

test("public registration rejects admin accounts", () => {
  const result = registerSchema.safeParse({ ...baseRegistration, role: "admin" });
  assert.equal(result.success, false);
});

test("registration accepts pharmacy accounts for server-side approval", () => {
  const result = registerSchema.safeParse({ ...baseRegistration, role: "pharmacy" });
  assert.equal(result.success, true);
});

test("registration rejects weak or mismatched passwords", () => {
  assert.equal(registerSchema.safeParse({ ...baseRegistration, password: "short" }).success, false);
  assert.equal(registerSchema.safeParse({ ...baseRegistration, confirmPassword: "different" }).success, false);
});

test("login requires a valid email and password", () => {
  assert.equal(loginSchema.safeParse({ email: "not-an-email", password: "password" }).success, false);
  assert.equal(loginSchema.safeParse({ email: "user@example.com", password: "password" }).success, true);
});
