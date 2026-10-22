import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    hashedPassword: { type: String, required: true },
    email: { type: String, lowercase: true, unique: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    avatarUrl: { type: String }, //Link CDN de hien thi anh
    avatarId: { type: String }, //Cloudinary public_id de hien thi anh
    bio: { type: String, maxlength: 500 },
    phone: { type: String, parse: true }, //cho phep gia tri nay de trong, nhap thi khong de trung}
  },
  { timestamps: true },
);
const User = mongoose.model("User", userSchema);
export default User;
