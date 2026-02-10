import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
});

// প্রোডাকশনে অনেক সময় মডেল ডুপ্লিকেট এরর দেয়, তাই এটি ব্যবহার করা নিরাপদ
const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);

export default Book;
