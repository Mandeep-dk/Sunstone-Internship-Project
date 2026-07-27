import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productCategory: {
        type: String,
        required: true
    },
    productCondition: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    imagePublicId: {
        type: String
    }
}, {
    timestamps: true
});

export default mongoose.model("Product", productSchema);