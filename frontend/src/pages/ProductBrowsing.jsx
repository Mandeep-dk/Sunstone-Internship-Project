import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';

function ProductBrowsing() {
    const API = "http://localhost:5000/api/getProducts";

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await fetch(API, { method: "GET" });
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.log(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        getProducts();
    }, [])

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto px-6 py-10">
                <h3 className="font-bold text-4xl mb-8">Browse products</h3>

                {loading && <p className="text-gray-500">Loading products...</p>}
                {error && <p className="text-red-500">Failed to load products.</p>}
                {!loading && !error && products.length === 0 && (
                    <p className="text-gray-500">No products found.</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, i) => (
                        <div key={product._id || i} className="border rounded-lg overflow-hidden shadow-sm">
                            <img
                                src={product.image}
                                alt={product.productName}
                                className="w-full h-48 object-cover bg-gray-100"
                            />
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-semibold text-lg">{product.productName}</h4>
                                    <span className="text-green-700 font-medium">${product.productPrice}</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{product.productDescription}</p>
                                <div className="text-xs text-gray-500">
                                    {product.productCategory} · {product.productCondition}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ProductBrowsing