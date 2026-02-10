import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// Database Connection Function
let isConnected = false;
async function connectToMongoDB() {
  try {
    if (isConnected) return;
    await mongoose.connect(URI);
    isConnected = true;
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
}

// Middleware to check MongoDB connection for Vercel
app.use(async (req, res, next) => {
  if (!isConnected) {
    await connectToMongoDB();
  }
  next();
});

// Initializing Database Connection
connectToMongoDB();

// Defining Routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

// Starting Server (Local development only)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

// Export for Vercel
export default app;
