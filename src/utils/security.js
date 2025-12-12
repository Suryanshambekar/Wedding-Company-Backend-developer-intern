import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const hashPassword = (pw) => bcrypt.hash(pw, 10);
export const verifyPassword = (pw, hash) => bcrypt.compare(pw, hash);
export const signJwt = (adminId, orgId) =>
  jwt.sign({ sub: adminId, org: orgId }, env.jwtSecret, { expiresIn: "1h" });

