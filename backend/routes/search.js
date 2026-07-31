import express from 'express';
import Product from "../models/productSchema.js";
const router=express.Router();

router.get("/", async (req, res) => {
  try {
    const search = req.query.q || "";
    console.log(req.query.q);
    const products = await Product.find({
      productName: {
        $regex: search,
        $options: "i", // case-insensitive
      },
    }).sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;