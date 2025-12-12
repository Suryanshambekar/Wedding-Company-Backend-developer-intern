import { AdminRepo } from "../repositories/admin.repo.js";
import { OrgRepo } from "../repositories/org.repo.js";
import { verifyPassword, signJwt } from "../utils/security.js";
import { Unauthorized } from "../utils/errors.js";

export const AuthService = {
  async login(master, { email, password }) {
    const admin = await AdminRepo.findByEmail(master, email);
    if (!admin) throw Unauthorized("Invalid credentials");
    const ok = await verifyPassword(password, admin.password_hash);
    if (!ok) throw Unauthorized("Invalid credentials");
    const org = await OrgRepo.findByAdminId(master, admin._id);
    if (!org) throw Unauthorized("Organization not found for admin");
    const token = signJwt(String(admin._id), String(org._id));
    return { access_token: token, token_type: "bearer" };
  },
};

