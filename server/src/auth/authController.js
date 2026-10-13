import bcrypt from "bcryptjs";
import prisma from "../db.js";
import { config } from "../config.js";
import { createSession, destroySession, getSessionUser, publicUser, SESSION_COOKIE } from "./session.js";
import { loginSchema, registerSchema } from "./validation.js";

function setSessionCookie(response, session) {
  response.cookie(SESSION_COOKIE, session.token, {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: "lax",
    maxAge: session.maxAge,
    path: "/",
  });
}

function clearSessionCookie(response) {
  response.clearCookie(SESSION_COOKIE, { httpOnly: true, secure: config.isProduction, sameSite: "lax", path: "/" });
}

function validationError(error) {
  return { message: "Please correct the highlighted fields.", fields: Object.fromEntries(error.issues.map((issue) => [issue.path[0], issue.message])) };
}

export async function register(request, response) {
  const result = registerSchema.safeParse(request.body);
  if (!result.success) return response.status(400).json(validationError(result.error));

  const { name, email, phone, password, role } = result.data;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return response.status(409).json({ message: "An account with this email already exists." });

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      fullName: name,
      email,
      phone,
      passwordHash,
      accountType: role === "pharmacy" ? "PHARMACY" : "CUSTOMER",
      status: role === "pharmacy" ? "PENDING_APPROVAL" : "ACTIVE",
    },
  });

  return response.status(201).json({ user: publicUser(user), message: "Account created successfully." });
}

export async function login(request, response) {
  const result = loginSchema.safeParse(request.body);
  if (!result.success) return response.status(400).json(validationError(result.error));

  const user = await prisma.user.findUnique({ where: { email: result.data.email } });
  const valid = user && await bcrypt.compare(result.data.password, user.passwordHash);
  if (!valid) return response.status(401).json({ message: "Invalid email or password." });
  if (user.status === "DISABLED") return response.status(403).json({ message: "This account has been disabled." });

  const session = await createSession(user.id, Boolean(request.body.remember));
  setSessionCookie(response, session);
  return response.json({ user: publicUser(user) });
}

export async function me(request, response) {
  const session = await getSessionUser(request.cookies[SESSION_COOKIE]);
  if (!session || session.user.status === "DISABLED") return response.status(401).json({ message: "Authentication required." });
  return response.json({ user: publicUser(session.user) });
}

export async function logout(request, response) {
  await destroySession(request.cookies[SESSION_COOKIE]);
  clearSessionCookie(response);
  return response.status(204).send();
}
