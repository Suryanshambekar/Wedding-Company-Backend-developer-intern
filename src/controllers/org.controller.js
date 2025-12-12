import { OrgService } from "../services/org.service.js";

export const OrgController = {
  create: (master) => async (req, res, next) => {
    try {
      const result = await OrgService.create(master, req.body);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  },

  get: (master) => async (req, res, next) => {
    try {
      const org = await OrgService.get(master, req.query.organization_name);
      const admin = await master.collection("admins").findOne({ _id: org.admin_id });
      res.json({
        id: String(org._id),
        organization_name: org.organization_name,
        collection_name: org.collection_name,
        admin_email: admin?.email,
      });
    } catch (e) {
      next(e);
    }
  },

  update: (master) => async (req, res, next) => {
    try {
      await OrgService.rename(master, req.body);
      res.json({ status: "ok" });
    } catch (e) {
      next(e);
    }
  },

  remove: (master) => async (req, res, next) => {
    try {
      await OrgService.remove(master, req.query.organization_name, req.admin.adminId);
      res.json({ status: "deleted" });
    } catch (e) {
      next(e);
    }
  },
};

