import { OrgRepo } from "../repositories/org.repo.js";
import { AdminRepo } from "../repositories/admin.repo.js";
import { hashPassword, verifyPassword } from "../utils/security.js";
import { slugify } from "../utils/slug.js";
import { BadRequest, NotFound, Unauthorized } from "../utils/errors.js";

export const OrgService = {
  async create(master, { organization_name, email, password }) {
    if (await OrgRepo.findByName(master, organization_name)) {
      throw BadRequest("Organization already exists");
    }

    const slug = slugify(organization_name);
    const collName = `org_${slug}`;

    await master.createCollection(collName);

    const password_hash = await hashPassword(password);
    const adminRes = await AdminRepo.create(master, { email, password_hash });
    const orgRes = await OrgRepo.create(master, {
      organization_name,
      collection_name: collName,
      admin_id: adminRes.insertedId,
    });

    return {
      id: String(orgRes.insertedId),
      organization_name,
      collection_name: collName,
      admin_email: email,
    };
  },

  async get(master, organization_name) {
    const org = await OrgRepo.findByName(master, organization_name);
    if (!org) throw NotFound("Organization not found");
    return org;
  },

  async rename(master, { organization_name, new_name, email, password }) {
    const org = await this.get(master, organization_name);
    const admin = await AdminRepo.findById(master, org.admin_id);
    if (!admin || admin.email !== email) throw Unauthorized("Unauthorized");
    const ok = await verifyPassword(password, admin.password_hash);
    if (!ok) throw Unauthorized("Unauthorized");

    const newSlug = slugify(new_name);
    const newColl = `org_${newSlug}`;

    await master.createCollection(newColl);
    const src = master.collection(org.collection_name);
    const dst = master.collection(newColl);
    const cursor = src.find({});
    for await (const doc of cursor) {
      const { _id, ...rest } = doc;
      await dst.insertOne(rest);
    }
    await master.dropCollection(org.collection_name);
    await OrgRepo.updateName(master, organization_name, new_name, newColl);
  },

  async remove(master, organization_name, requesterAdminId) {
    const org = await this.get(master, organization_name);
    if (String(org.admin_id) !== requesterAdminId) throw Unauthorized("Unauthorized");
    await master.dropCollection(org.collection_name);
    await OrgRepo.deleteByName(master, organization_name);
    await AdminRepo.deleteById(master, org.admin_id);
  },
};

