import express from 'express';
import uploadRoute from './routes/productListing.js';
import showProductRoute from './routes/showProducts.js';
import productDetail from './routes/productDetail.js';
import searchRoute from './routes/search.js';
import wishlistRoute from './routes/wishlist.js';
import cors from "cors";
import connectDB from "./config/db.js";

const app=express();

app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/upload", uploadRoute);
app.use("/api/getProducts", showProductRoute);
app.use("/api", productDetail)
app.use("/api/search", searchRoute);
app.use("/api/wishlist", wishlistRoute);

app.listen(5000,()=>{
    console.log(`Server listening on 5000`)
})