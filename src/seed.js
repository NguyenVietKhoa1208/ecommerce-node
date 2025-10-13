import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Product from "./models/Product.js";
import bcrypt from "bcrypt";

dotenv.config();
const run = async () => {
  try {
    await connectDB();
    // Clear existing
    await User.deleteMany({});
    await Product.deleteMany({});

    const adminPassword = await bcrypt.hash("admin123", 10);
    const admin = await User.create({ name: "Admin", email: "admin@example.com", password: adminPassword, isAdmin: true });

    const sampleProducts = [
      { name: "Blue Shirt", price: 29.99, description: "Comfortable blue shirt", category: "Clothing", countInStock: 50 },
      { name: "Red Hat", price: 15.99, description: "Stylish red hat", category: "Accessories", countInStock: 30 },
      { name: "Running Shoes", price: 79.99, description: "Lightweight running shoes", category: "Shoes", countInStock: 20 },
    ];

    await Product.insertMany(sampleProducts);

    console.log("Seed completed. Admin credentials: admin@example.com / admin123");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err.message);
    process.exit(1);
  }
};

run();
