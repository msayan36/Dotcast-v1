import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile_desc: {
      type: String,
      default: null,
    },
    social: [
      {
        name: String,
        link: String,
      },
    ],
    profile_pic: {
      type: String,
      default: null,
    },
    video_ids_array: [
      {
        type: String,
      },
    ],
    video_ids_array_recent: [
      {
        type: String,
      },
    ],
    follower_ids_array: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Middleware to hash the password before saving it.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
