import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SaleProducts() {
  const API1 = import.meta.env.VITE_API_URL;

  const API = `${API1}/api/getProducts`;

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
    };
    getProducts();
  }, []);

  return (
    <section className="px-6 md:px-10 mt-16">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">
          Recently Added
        </h2>
        <Link
          to="/products"
          className="text-sm font-medium text-teal-700 hover:text-teal-800 transition"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg border border-slate-200 overflow-hidden animate-pulse"
            >
              <div className="aspect-square w-full bg-slate-100" />
              <div className="p-3 space-y-2">
                <div className="h-3 w-3/4 bg-slate-100 rounded" />
                <div className="h-3 w-1/3 bg-slate-100 rounded" />
              </div>
            </div>
          ))}

        {!loading && products.length === 0 && (
          <p className="col-span-full text-sm text-slate-500">
            No products found.
          </p>
        )}

        {!loading &&
          products.map((product, index) => (
            <Link
              to={`/productDetail/${product._id}`}
              key={product._id || index}
              className="group block bg-white rounded-lg border border-slate-200 overflow-hidden hover:border-teal-600 hover:shadow-sm transition"
            >
              <div className="aspect-square w-full bg-slate-100 overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.productName}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                    No image
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-slate-900 truncate group-hover:text-teal-700">
                  {product.productName}
                </h3>
                {product.productPrice != null && (
                  <p className="text-sm text-slate-500 mt-1">
                    ₹{product.productPrice}
                  </p>
                )}
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}

export default SaleProducts;