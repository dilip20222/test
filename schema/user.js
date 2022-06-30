const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, require: true },
    userName: { type: String, require: true },
    email: { type: String, require: true },
    DOB: { type: String, required: true },
    password: { type: String, require: true },
    isAdmin: { type: Boolean},
},
  {
    timestamps: true,
    get: (v) => v.toDateString(),
  }
);

module.exports = mongoose.model("user", userSchema);
