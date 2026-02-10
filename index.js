import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

dotenv.config();

const app = express();

// CORS কনফিগারেশনে আপনার লাইভ ফ্রন্টএন্ড লিঙ্কটি ঠিক করে দেওয়া হলো
app.use(cors({
    origin: [
        "http://localhost:5173", 
        "https://book-store-frontend-tan-five.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

const PORT = process.env.PORT || 4001;

// MongoDB কানেকশন স্ট্রিং
const URI = process.env.MongoDB_URI; 

mongoose.connect(URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log("Error connecting to MongoDB: ", error));

// Routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

app.get("/", (req, res) => {
    res.send("Book Store Server is Running!");
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

export default app;
