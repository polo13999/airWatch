const mongoose = require("mongoose");
const { Schema } = mongoose;

const fragment = {
  sort: { type: Number },
  createdAt: { type: Date, default: Date.now },
  createUserId: { type: Schema.Types.ObjectId, default: null, ref: "User" },
  updatedAt: { type: Date },
  updatedUserId: { type: Schema.Types.ObjectId, default: null, ref: "User" },
  deletedAt: { type: Date, default: null },
  deleteUserId: { type: Schema.Types.ObjectId, default: null, ref: "User" }
};
module.exports = fragment;
