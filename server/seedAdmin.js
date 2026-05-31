import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import User from "./models/usermodel.js";

dotenv.config();

async function seedAdmin() {
  try {
  await mongoose.connect(process.env.MONGODB_URI);

    const existingUser = await User.findOne({
      email: "admin@gmail.com",
    });

    if (existingUser) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    await User.create({
      email: "admin@gmail.com",
      password: hashedPassword,
    });

    console.log("Admin created successfully");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

seedAdmin();