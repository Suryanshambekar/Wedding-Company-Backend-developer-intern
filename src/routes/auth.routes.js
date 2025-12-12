import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.js";
import { loginSchema } from "../schemas/auth.schema.js";

export const authRoutes = (master) => {
  const r = Router();
  r.post("/login", validate(loginSchema), AuthController.login(master));
  return r;
};

