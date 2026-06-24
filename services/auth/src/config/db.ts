import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/Zomato-Clone');
    console.log("✅ Database Connected (Local MongoDB)");
  } catch (error) {
    console.error("❌ DB error:", error);
    process.exit(1);
  }
};

export default connectDB;