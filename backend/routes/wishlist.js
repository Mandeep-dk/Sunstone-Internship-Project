import express from 'express';
import Wishlist from '../models/wishlistSchema.js';

const router = express.Router();

router.post("/add", async (req, res) => {
    try {
        const { productId, userId } = req.body;

        const exists = await Wishlist.findOne({ userId, productId });
        if (exists) {
            return res.json({ message: "Already in wishlist" });
        }

        await Wishlist.create({ userId, productId });

        res.json({ message: "Added to wishlist" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// Check whether a specific product is already in a user's wishlist
router.get("/check/:userId/:productId", async (req, res) => {
    try {
        const { userId, productId } = req.params;

        const exists = await Wishlist.findOne({ userId, productId });

        res.json({ isWishlisted: !!exists });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get("/:userId", async (req, res) => {
    try {
        const items = await Wishlist.find({
            userId: req.params.userId,
        }).populate("productId");
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

export default router;