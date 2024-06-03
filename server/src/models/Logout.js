import { Schema,model } from "mongoose";

const tokenBlacklistSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
});

const TokenBlacklist = model("TokenBlacklist", tokenBlacklistSchema);

export default TokenBlacklist;
