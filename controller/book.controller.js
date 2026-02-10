import Book from "../model/book.model.js";

export const getBook = async (req, res) => {
  try {
    const book = await Book.find();
    // ডাটা পাওয়া গেলে ২০০ স্ট্যাটাসসহ পাঠানো হচ্ছে
    res.status(200).json(book);
  } catch (error) {
    console.log("Error: ", error);
    // Vercel-এ এরর ডিবাগ করার জন্য নিচের ফরম্যাটটি বেশি কার্যকর
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
