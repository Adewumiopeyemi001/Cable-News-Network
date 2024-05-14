import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    role: {
      type: Number,
      enum: [1, 2, 3, 4], // 1 = user, 2 = Chief-Editor, 3 = Administrator, 4 = developer
      default: 1,
    },
    resetPasswordToken: {
      type: String,
      // required: true,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;

    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role },
    process.env.SECRET_KEY,
    {
      expiresIn: process.env.EXPIRES_IN, // You can adjust the expiration time
    }
  );
  return token;
};

const User = mongoose.model("User", userSchema);
export default User;