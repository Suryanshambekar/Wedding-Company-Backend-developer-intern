import { ObjectId } from "mongodb";

export const AdminRepo = {
  findByEmail: (master, email) => master.collection("admins").findOne({ email }),
  findById: (master, id) => master.collection("admins").findOne({ _id: new ObjectId(id) }),
  create: (master, doc) => master.collection("admins").insertOne(doc),
  deleteById: (master, id) =>
    master.collection("admins").deleteOne({ _id: new ObjectId(id) }),
};

