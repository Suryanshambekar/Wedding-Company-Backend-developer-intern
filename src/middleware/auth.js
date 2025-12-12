import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { Unauthorized } from "../utils/errors.js";

export function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return next(Unauthorized("Unauthorized"));
  try {
    const payload = jwt.verify(auth.slice(7), env.jwtSecret);
    req.admin = { adminId: payload.sub, orgId: payload.org };
    next();
  } catch {
    next(Unauthorized("Invalid token"));
  }
}

