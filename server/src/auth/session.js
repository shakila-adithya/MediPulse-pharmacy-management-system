import crypto from "node:crypto";
import prisma from "../db.js";
import { config } from "../config.js";

export const SESSION_COOKIE = "medipulse_session";
const SESSION_DAYS = 1;
const REMEMBERED_SESSION_DAYS = 30;

function hashToken(token) {
  return crypto.createHmac("sha256", config.sessionSecret).update(token).digest("hex");
}

export async function createSession(userId, remember) {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + (remember ? REMEMBERED_SESSION_DAYS : SESSION_DAYS) * 86400000);

  await prisma.session.create({ data: { tokenHash: hashToken(token), userId, expiresAt } });
  return { token, expiresAt, maxAge: expiresAt.getTime() - Date.now() };
}

export async function getSessionUser(token) {
  if (!token) return null;
  const session = await prisma.session.findUnique({
    where: { tokenHash: hashToken(token) },
    include: { user: true },
  });

  if (!session) return null;
  if (session.expiresAt <= new Date()) {
    await prisma.session.delete({ where: { id: session.id } });
    return null;
  }
  return { session, user: session.user };
}

export async function destroySession(token) {
  if (!token) return;
  await prisma.session.deleteMany({ where: { tokenHash: hashToken(token) } });
}

export function publicUser(user) {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    accountType: user.accountType,
    status: user.status,
    createdAt: user.createdAt,
  };
}
