import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs"
const userSchema = new Schema(
  {
    name: { type: String, default: "-" },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
    },
    address: {
      type: String,
      default: "-",
    },
    mobile: {
      type: String,
      require: [true, "Please Provide Number"],
      unique: [true, "Please enter Another"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};
userSchema.pre("save", async function (next) {
  if (!this.isModified()) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});


const User = model("User", userSchema);

export default User;
