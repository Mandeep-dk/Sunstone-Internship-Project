import express from 'express';
import Products from '../models/productSchema.js';

const router = express.Router();
router.get('/getProduct/:id', async (req, res) => {
    try {
        const product = await Products.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;