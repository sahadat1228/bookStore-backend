import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullname: {
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
});

// Vercel বা সার্ভারলেস এনভায়রনমেন্টে মডেল রি-ডিক্লেয়ারেশন সমস্যা এড়াতে এটি সেরা উপায়
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
