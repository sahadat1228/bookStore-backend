import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

dotenv.config();

const app = express();

// ১. CORS কনফিগারেশন - এটি আপনার ব্রাউজারের এরর ঠিক করবে
app.use(cors({
    origin: ["http://localhost:5173", "https://book-store-backend-git-main-sahadat-khans-projects.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

const PORT = process.env.PORT || 4001;

// ২. আপনার .env ফাইলের নামের সাথে মিল রেখে MongoDBURI ব্যবহার করুন
const URI = process.env.MongoDBURI; 

// ৩. ডাটাবেস কানেকশন লজিক
mongoose.connect(URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log("Error connecting to MongoDB: ", error));

// ৪. Defining Routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

// হোম রুট
app.get("/", (req, res) => {
    res.send("Book Store Server is Running!");
});

// ৫. সার্ভার লিসেনিং
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

// Vercel এর জন্য এক্সপোর্ট
export default app;
