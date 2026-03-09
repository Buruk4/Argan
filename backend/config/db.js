import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongoDB connected successfully");
  } catch (error) {
    console.log({ message: error.message });
  }
};

export default connectDB;
