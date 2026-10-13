import { getSessionUser, SESSION_COOKIE } from "./session.js";

export async function requireAuth(request, response, next) {
  const session = await getSessionUser(request.cookies[SESSION_COOKIE]);
  if (!session || session.user.status === "DISABLED") return response.status(401).json({ message: "Authentication required." });
  request.user = session.user;
  next();
}
