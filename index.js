import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

// ১. সবার আগে dotenv লোড করতে হয়
dotenv.config();

const app = express();

// ২. Middleware (আগে CORS দিন, তারপর JSON)
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4001;
// খেয়াল করুন: এখানে MongoDB_URI ব্যবহার করুন যা আপনি Vercel-এ দিয়েছেন
const URI = process.env.MongoDB_URI; 

// ৩. ডাটাবেস কানেকশন লজিক (Vercel-এর জন্য সহজ রাখা ভালো)
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.log("Error connecting to MongoDB: ", error));

// ৪. Defining Routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

// হোম রুট (সার্ভার ঠিক আছে কি না চেক করার জন্য)
app.get("/", (req, res) => {
    res.send("Book Store Server is Running!");
});

// ৫. সার্ভার লিসেনিং (লোকাল ও ভেরসেল উভয়ের জন্য)
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}

// ৬. Export for Vercel
export default app;
