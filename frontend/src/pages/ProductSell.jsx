import React, { useState, useRef } from 'react'
import Navbar from '../components/Navbar'
// import axios from 'axios';

const CATEGORIES = [
    { label: 'Electronics', emoji: '💻' },
    { label: 'Fashion', emoji: '👗' },
    { label: 'Books', emoji: '📚' },
    { label: 'Furniture', emoji: '🛋️' },
    { label: 'Sports', emoji: '🏀' },
    { label: 'Vehicles', emoji: '🚗' },
    { label: 'Others', emoji: '📦' },
]

const CONDITIONS = ['New', 'Like New', 'Good', 'Fair', 'Poor']

function ProductSell() {
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productCondition, setProductCondition] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const fileInputRef = useRef(null);
    const API = 'http://localhost:5000/api/upload';

    const handleImageChange = (file) => {
        if (!file) return;
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    }

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) handleImageChange(file);
    }

    const isValid = productName && productPrice && productCategory && productCondition;

    const handleReq = async (e) => {
        e.preventDefault();
        if (!isValid) return;

        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("productDescription", productDescription);
        formData.append("productPrice", productPrice);
        formData.append("productCategory", productCategory);
        formData.append("productCondition", productCondition);
        formData.append("image", image);

        setSubmitting(true);
        try {
            const res = await fetch(API, {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            console.log(data);
            setSubmitted(true);
        } catch (err) {
            console.log(err);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#F4F5F7]">
                <div className="max-w-4xl mx-auto px-6 py-12">

                    <div className="mb-8">
                        <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#0F6B5C] mb-2">New listing</p>
                        <h3 className="font-serif text-4xl md:text-5xl font-bold text-[#1B1F23]">
                            List your item
                        </h3>
                        <p className="text-[#5B6470] mt-2 max-w-lg">
                            Fill in the details below. Clear photos and honest descriptions sell faster.
                        </p>
                    </div>

                    <form onSubmit={handleReq} className="relative bg-white rounded-2xl shadow-sm border border-[#E4E7EB] overflow-hidden md:grid md:grid-cols-[280px_1px_1fr]">

                        {/* Image / photo panel */}
                        <div className="p-8 flex flex-col">
                            <label className="font-mono text-xs tracking-[0.15em] uppercase text-[#5B6470] mb-3">Photo</label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                onDrop={handleDrop}
                                onDragOver={(e) => e.preventDefault()}
                                className="group cursor-pointer flex-1 min-h-[220px] rounded-xl border-2 border-dashed border-[#C9CED6] hover:border-[#0F6B5C] transition-colors flex items-center justify-center overflow-hidden bg-[#FAFAFA]"
                            >
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Product preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-center px-4">
                                        <div className="text-3xl mb-2">📷</div>
                                        <p className="text-sm text-[#5B6470]">
                                            <span className="text-[#0F6B5C] font-medium">Upload a photo</span><br />or drag it here
                                        </p>
                                    </div>
                                )}
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleImageChange(e.target.files[0])}
                            />
                            {imagePreview && (
                                <button
                                    type="button"
                                    onClick={() => { setImage(null); setImagePreview(null); }}
                                    className="mt-3 text-sm text-[#B3453A] hover:underline text-left"
                                >
                                    Remove photo
                                </button>
                            )}
                        </div>

                        {/* Ticket-style perforated divider (desktop only) */}
                        <div className="hidden md:block relative bg-[#E4E7EB]">
                            <div className="absolute inset-0 flex flex-col justify-between py-4">
                                {Array.from({ length: 14 }).map((_, i) => (
                                    <span key={i} className="w-2 h-2 -ml-[3.5px] rounded-full bg-[#F4F5F7]" />
                                ))}
                            </div>
                        </div>

                        {/* Details panel */}
                        <div className="p-8 flex flex-col gap-6">

                            <div>
                                <label className="block font-mono text-xs tracking-[0.15em] uppercase text-[#5B6470] mb-2">
                                    Product name
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Sony WH-1000XM5 headphones"
                                    className="w-full border border-[#D3D7DD] rounded-lg px-4 py-2.5 text-[#1B1F23] placeholder:text-[#A6ADB6] focus:outline-none focus:ring-2 focus:ring-[#0F6B5C]/40 focus:border-[#0F6B5C]"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block font-mono text-xs tracking-[0.15em] uppercase text-[#5B6470] mb-2">
                                    Description
                                </label>
                                <textarea
                                    placeholder="Condition details, reason for selling, anything a buyer should know"
                                    rows={3}
                                    className="w-full border border-[#D3D7DD] rounded-lg px-4 py-2.5 text-[#1B1F23] placeholder:text-[#A6ADB6] focus:outline-none focus:ring-2 focus:ring-[#0F6B5C]/40 focus:border-[#0F6B5C] resize-none"
                                    value={productDescription}
                                    onChange={(e) => setProductDescription(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block font-mono text-xs tracking-[0.15em] uppercase text-[#5B6470] mb-2">
                                    Price
                                </label>
                                <div className="relative w-full sm:w-48">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5B6470] font-mono">$</span>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        className="w-full border border-[#D3D7DD] rounded-lg pl-8 pr-4 py-2.5 font-mono text-[#1B1F23] placeholder:text-[#A6ADB6] focus:outline-none focus:ring-2 focus:ring-[#0F6B5C]/40 focus:border-[#0F6B5C]"
                                        value={productPrice}
                                        onChange={(e) => setProductPrice(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-mono text-xs tracking-[0.15em] uppercase text-[#5B6470] mb-2">
                                    Category
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {CATEGORIES.map(({ label, emoji }) => (
                                        <button
                                            type="button"
                                            key={label}
                                            onClick={() => setProductCategory(label)}
                                            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                                                productCategory === label
                                                    ? 'bg-[#0F6B5C] border-[#0F6B5C] text-white'
                                                    : 'border-[#D3D7DD] text-[#5B6470] hover:border-[#0F6B5C]'
                                            }`}
                                        >
                                            <span className="mr-1">{emoji}</span>{label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block font-mono text-xs tracking-[0.15em] uppercase text-[#5B6470] mb-2">
                                    Condition
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {CONDITIONS.map((c) => (
                                        <button
                                            type="button"
                                            key={c}
                                            onClick={() => setProductCondition(c)}
                                            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                                                productCondition === c
                                                    ? 'bg-[#E4A93E] border-[#E4A93E] text-[#1B1F23] font-medium'
                                                    : 'border-[#D3D7DD] text-[#5B6470] hover:border-[#E4A93E]'
                                            }`}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-2 mt-auto">
                                <button
                                    type="submit"
                                    disabled={!isValid || submitting}
                                    className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#1B1F23] text-white font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#0F6B5C] transition-colors"
                                >
                                    {submitting ? 'Publishing…' : 'Publish listing'}
                                </button>
                                {submitted && (
                                    <p className="text-sm text-[#0F6B5C] mt-3">Listing published.</p>
                                )}
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ProductSell