import express from 'express';
import Products from '../models/productSchema.js';

const router = express.Router();

router.get("/", async(req, res)=>{
    try{
        const products=await Products.find();
        res.json(products);
    }catch(err){
        console.error(err);
        res.status(500).json({message:err.message})
    }
})



export default router;