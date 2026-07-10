import React, { useState } from 'react'
import Navbar from '../components/Navbar'
// import axios from 'axios';

function ProductSell() {
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productCondition, setProductCondition] = useState("");
    const [image, setImage] = useState(null);
    const API = 'http://localhost:5000/list';

    // const handleReq = async (e) => {
    //     e.preventDefault();

    //     const product = {
    //         productName,
    //         productDescription,
    //         productPrice,
    //         productCategory,
    //         productCondition,
    //     };

       
    // }
    return (
        <>
            <Navbar />
            <h3 className="px-8 font-bold text-4xl">Product listing</h3>
            <div className="flex flex-col px-8">

                <p>Product name:</p>
                <input type="text" className="border border-1 w-50" value={productName} onChange={(e) => setProductName(e.target.value)}></input>
                <p>Product Description:</p>
                <input type="text" className="border border-1 w-50" value={productDescription} onChange={(e) => setProductDescription(e.target.value)}></input>
                <p>Product price:</p>
                <input type="text" className="border border-1 w-50" value={productPrice} onChange={(e) => setProductPrice(e.target.value)}></input>
                <label className="block mb-2 font-medium">Category</label>

                <select value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="w-50 p-3 border rounded-lg">
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Books">Books</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Sports">Sports</option>
                    <option value="Vehicles">Vehicles</option>
                    <option value="Others">Others</option>
                </select>

                <label>Product condition:</label>
                <select value={productCondition} onChange={(e) => setProductCondition(e.target.value)} className="w-50 p-3 border rounded-lg">
                    <option value="">Select Condition</option>
                    <option value="New">New</option>
                    <option value="Like New">Like New</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                </select>
                <p>Upload image:</p>
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <button >Submit</button>
            </div>
        </>
    )
}

export default ProductSell