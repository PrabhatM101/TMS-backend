const mongoose = require("mongoose");

const loginHistorySchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    token: { type: String, required: true },
    ipAddress: { type: String },
    userAgent: { type: String },
    device: { type: String },
    os: { type: String },
    browser: { type: String },
    loggedInAt: { type: Date, default: Date.now },
    loggedOutAt: { type: Date },   
    isTrashed: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("LoginHistories", loginHistorySchema);
