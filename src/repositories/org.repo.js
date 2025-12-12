export const OrgRepo = {
  findByName: (master, name) =>
    master.collection("organizations").findOne({ organization_name: name }),
  findByAdminId: (master, adminId) =>
    master.collection("organizations").findOne({ admin_id: adminId }),
  create: (master, doc) => master.collection("organizations").insertOne(doc),
  updateName: (master, oldName, newName, newColl) =>
    master.collection("organizations").updateOne(
      { organization_name: oldName },
      { $set: { organization_name: newName, collection_name: newColl } }
    ),
  deleteByName: (master, name) =>
    master.collection("organizations").deleteOne({ organization_name: name }),
};

