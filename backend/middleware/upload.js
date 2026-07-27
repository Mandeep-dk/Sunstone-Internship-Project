import express from 'express';
import multer from 'multer';
const router=express.Router();
// const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage
});

// module.exports=upload;
export default upload;