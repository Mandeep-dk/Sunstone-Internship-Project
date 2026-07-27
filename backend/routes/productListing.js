import express from "express";
import upload from "../middleware/upload.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import Product from "../models/productSchema.js";

const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
    try {

        const streamUpload = () => {
            return new Promise((resolve, reject) => {

                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "marketplace"
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );

                streamifier.createReadStream(req.file.buffer).pipe(stream);

            });
        };

        const result = await streamUpload();

        const product = await Product.create({
            productName: req.body.productName,
            productDescription: req.body.productDescription,
            productPrice: req.body.productPrice,
            productCategory: req.body.productCategory,
            productCondition: req.body.productCondition,
            image: result.secure_url,
            imagePublicId: result.public_id
        });

        res.status(201).json({
            message: "Product uploaded successfully",
            product
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Upload failed",
            error: err.message
        });
    }
});

export default router;