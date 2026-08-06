import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../auth/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "../components/Navbar";
const API = import.meta.env.VITE_API_URL;

function Wishlist() {
  const [userId, setUserId] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Firebase user:", user.uid);
        setUserId(user.uid);
      } else {
        console.log("No user logged in");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch wishlist after userId is available
  useEffect(() => {
    if (!userId) return;

    const getWishlist = async () => {
      try {
        console.log("Fetching wishlist for:", userId);

        const res = await fetch(
          `${API}/api/wishlist/${userId}`
        );

        const data = await res.json();

        console.log("Wishlist data:", data);
        setWishlist(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getWishlist();
  }, [userId]);

  return (
    <>
      <Navbar />

   <section className="px-4 sm:px-6 md:px-10 py-6 sm:py-8 max-w-6xl mx-auto">
        <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900 mb-4 sm:mb-6">
          Wishlist
        </h1>

        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
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
          </div>
        )}

        {!loading && wishlist.length === 0 && (
          <p className="text-sm text-slate-500">
            Your wishlist is empty. Items you save will show up here.
          </p>
        )}

        {!loading && wishlist.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {wishlist.map((item) => (
              <Link
                to={`/productDetail/${item.productId._id}`}
                key={item._id}
                className="group block bg-white rounded-lg border border-slate-200 overflow-hidden hover:border-teal-600 hover:shadow-sm transition"
              >
                <div className="aspect-square w-full bg-slate-100 overflow-hidden">
                  {item.productId.image ? (
                    <img
                      src={item.productId.image}
                      alt={item.productId.productName}
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
                  <h2 className="text-sm font-medium text-slate-900 truncate group-hover:text-teal-700">
                    {item.productId.productName}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    ₹{item.productId.productPrice}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default Wishlist;