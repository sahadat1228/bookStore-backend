import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

dotenv.config();

const app = express();

// ১. CORS কনফিগারেশন - আপনার বর্তমান লাইভ ফ্রন্টএন্ড এবং লোকালহোস্ট দুইটাই এখানে আছে
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

// ২. MongoDB কানেকশন স্ট্রিং (আপনার ড্যাশবোর্ড অনুযায়ী MongoDB_URI রাখা হয়েছে)
const URI = process.env.MongoDB_URI; 

if (!URI) {
    console.error("MongoDB_URI is not defined in environment variables!");
}

mongoose.connect(URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log("Error connecting to MongoDB: ", error.message));

// ৩. Routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

app.get("/", (req, res) => {
    res.send("Book Store Server is Running!");
});

// ৪. সার্ভার লিসেনিং
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

export default app;
