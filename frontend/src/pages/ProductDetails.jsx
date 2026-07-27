import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'

const CONDITION_COLORS = {
    'New': 'bg-[#0F6B5C] text-white',
    'Like New': 'bg-[#0F6B5C]/80 text-white',
    'Good': 'bg-[#E4A93E] text-[#1B1F23]',
    'Fair': 'bg-[#E9C57A] text-[#1B1F23]',
    'Poor': 'bg-[#D3D7DD] text-[#5B6470]',
}

function DetailsSkeleton() {
    return (
        <div className="grid md:grid-cols-2 gap-10 animate-pulse">
            <div className="aspect-square rounded-2xl bg-[#EDEEF1]" />
            <div className="space-y-4 pt-2">
                <div className="h-3 w-24 bg-[#EDEEF1] rounded" />
                <div className="h-8 w-3/4 bg-[#EDEEF1] rounded" />
                <div className="h-6 w-32 bg-[#EDEEF1] rounded" />
                <div className="h-4 w-full bg-[#EDEEF1] rounded" />
                <div className="h-4 w-5/6 bg-[#EDEEF1] rounded" />
                <div className="h-11 w-full bg-[#EDEEF1] rounded-lg mt-6" />
            </div>
        </div>
    )
}

function ProductDetails() {
    const { id } = useParams();
    const API = `http://localhost:5000/api/getProduct/${id}`;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            setError(false);
            try {
                const res = await fetch(API, { method: "GET" });
                if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                console.log(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        getProduct();
    }, [id])

    const handleShare = async () => {
    try {
        await navigator.share({
            title: product.productName,
            text: product.productDescription,
            url: window.location.href
        });
    } catch (err) {
        console.log(err);
    }
};
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#F4F5F7]">
                <div className="max-w-5xl mx-auto px-6 py-10">

                    <Link to="/" className="inline-flex items-center gap-1 text-sm text-[#5B6470] hover:text-[#0F6B5C] mb-6 transition-colors">
                        ← Back to listings
                    </Link>

                    {loading && (
                        <div className="bg-white rounded-2xl border border-[#E4E7EB] p-8">
                            <DetailsSkeleton />
                        </div>
                    )}

                    {!loading && error && (
                        <div className="bg-white border border-[#E4A93E]/40 rounded-xl p-10 text-center">
                            <p className="text-[#B3453A] font-medium mb-1">Couldn't load this listing</p>
                            <p className="text-sm text-[#5B6470]">It may have been removed, or the server isn't reachable.</p>
                        </div>
                    )}

                    {!loading && !error && product && (
                        <div className="bg-white rounded-2xl border border-[#E4E7EB] shadow-sm overflow-hidden">
                            <div className="grid md:grid-cols-2">

                                {/* Image */}
                                <div className="bg-[#FAFAFA] flex items-center justify-center p-6 md:p-10 border-b md:border-b-0 md:border-r border-[#E4E7EB]">
                                    <img
                                        src={product.image}
                                        alt={product.productName}
                                        className="w-full aspect-square object-cover rounded-xl"
                                    />
                                </div>

                                {/* Details */}
                                <div className="p-6 md:p-10 flex flex-col">
                                    <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#0F6B5C] mb-2">
                                        {product.productCategory}
                                    </p>

                                    <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1B1F23] mb-3 leading-tight">
                                        {product.productName}
                                    </h1>

                                    <p className="font-mono text-3xl font-semibold text-[#1B1F23] mb-4">
                                        ${Number(product.productPrice).toFixed(2)}
                                    </p>

                                    <span className={`self-start text-xs px-3 py-1 rounded-full font-medium mb-6 ${CONDITION_COLORS[product.productCondition] || 'bg-[#D3D7DD] text-[#5B6470]'}`}>
                                        {product.productCondition} condition
                                    </span>

                                    <div className="mb-8">
                                        <h3 className="font-mono text-xs tracking-[0.15em] uppercase text-[#5B6470] mb-2">
                                            Description
                                        </h3>
                                        <p className="text-[#3A3F45] leading-relaxed">
                                            {product.productDescription || "No description provided."}
                                        </p>
                                    </div>

                                    <div className="mt-auto flex flex-col sm:flex-row gap-3">
                                        <button className="flex-1 px-6 py-3 rounded-lg bg-[#1B1F23] text-white font-medium hover:bg-[#0F6B5C] transition-colors">
                                            Message seller
                                        </button>
                                        <button className="px-6 py-3 rounded-lg border border-[#D3D7DD] text-[#1B1F23] font-medium hover:border-[#0F6B5C] transition-colors">
                                            Save
                                        </button>
                                        <button onClick={handleShare} className="px-6 py-3 rounded-lg border border-[#D3D7DD] text-[#1B1F23] font-medium hover:border-[#0F6B5C] transition-colors">
                                            Share
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default ProductDetails