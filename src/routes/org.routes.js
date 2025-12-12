import { Router } from "express";
import { OrgController } from "../controllers/org.controller.js";
import { validate } from "../middleware/validate.js";
import { orgCreateSchema, orgUpdateSchema } from "../schemas/org.schema.js";
import { requireAuth } from "../middleware/auth.js";

export const orgRoutes = (master) => {
  const r = Router();
  r.post("/create", validate(orgCreateSchema), OrgController.create(master));
  r.get("/get", OrgController.get(master));
  r.put("/update", validate(orgUpdateSchema), OrgController.update(master));
  r.delete("/delete", requireAuth, OrgController.remove(master));
  return r;
};

