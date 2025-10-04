import express from "express";
import Product from "../models/Product.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error.message);
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
});

// POST create new product
router.post("/", protect, isAdmin, async (req, res) => {
  const { name, price, description, countInStock } = req.body;
  try {
    if (!name || price == null) {
      return res.status(400).json({ message: "Name and price are required" });
    }
    const product = new Product({
      name,
      price,
      description,
      countInStock,
  });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Failed to create product:", error.message);
    res.status(500).json({ message: "Failed to create product", error: error.message });
  }
});

export default router;
