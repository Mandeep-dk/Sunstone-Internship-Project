import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function SaleProducts() {
    const API = "http://localhost:5000/api/getProducts";

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await fetch(API, { method: "GET" });
                const data = await res.json();

                const recent = [...data]
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 4);

                setProducts(recent);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        getProducts();
    }, [])

    return (
        <div className="px-10 mt-20">
            <div className='flex flex-col justify-between bg-orange-600 rounded-xl p-6 shadow-lg'>
                <div>
                    <h2 className="text-2xl font-bold mb-6 text-white">
                        Recently Added Products
                    </h2>
                </div>
                <div className="flex justify-between bg-white rounded-xl p-6 shadow-lg">

                    {loading && <p className="text-gray-500">Loading products...</p>}
                    {!loading && products.length === 0 && (
                        <p className="text-gray-500">No products found.</p>
                    )}

                    {!loading && products.map((product, index) => (
                        <Link to={`/productDetail/${product._id}`} key={product._id || index}>
                            <img
                                src={product.image}
                                alt={product.productName}
                                className="w-30 h-30 flex-shrink-0 object-cover object-center"
                            />
                            <p className="px-6">
                                {product.productName}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SaleProducts