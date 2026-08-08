import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, User, Heart, ShoppingCart, Loader2 } from "lucide-react";

function Navbar() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/search?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Top navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="px-4 sm:px-6 md:px-10 py-3">
          <div className="flex items-center justify-between gap-3 sm:gap-6">
            {/* Logo */}
            <Link
              to="/"
              className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900 whitespace-nowrap"
            >
              Re<span className="text-teal-700">Cart</span>
            </Link>

            {/* Search - visible from sm up */}
            <form
              onSubmit={handleSearch}
              className="flex-1 max-w-xl hidden sm:block"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search items"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full h-10 pl-9 pr-4 text-sm rounded-md border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition"
                />
              </div>
            </form>

            {/* Actions */}
            <nav className="flex items-center gap-3 sm:gap-6 text-slate-600 shrink-0">
              <Link to="/sell" className="flex flex-col items-center gap-0.5 hover:text-slate-900 transition">
                <User className="w-5 h-5 md:hidden" />
                <span className="text-xs font-medium hidden md:block">List items</span>
              </Link>
              <Link to="/wishlist" className="flex flex-col items-center gap-0.5 hover:text-slate-900 transition">
                <Heart className="w-5 h-5 md:hidden" />
                <span className="text-xs font-medium hidden md:block">Wishlist</span>
              </Link>
            </nav>
          </div>

          {/* Search on small screens */}
          <form onSubmit={handleSearch} className="mt-3 sm:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search items"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-4 text-sm rounded-md border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition"
              />
            </div>
          </form>
        </div>
      </header>

      {/* Search results */}
      {hasSearched && (
        <div className="px-4 sm:px-6 md:px-10 py-4 sm:py-6 bg-slate-50 min-h-[120px]">
          {loading ? (
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              Searching…
            </div>
          ) : products.length === 0 ? (
            <p className="text-sm text-slate-500">
              No results for "{query}". Try a different search term.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {products.map((p, index) => (
                <Link
                  to={`/productDetail/${p._id}`}
                  key={p._id || index}
                  className="group block bg-white rounded-lg border border-slate-200 overflow-hidden hover:border-teal-600 hover:shadow-sm transition"
                >
                  <div className="aspect-square w-full bg-slate-100 overflow-hidden">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.productName}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="p-2 sm:p-3">
                    <h3 className="text-xs sm:text-sm font-medium text-slate-900 truncate group-hover:text-teal-700">
                      {p.productName}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">₹{p.productPrice}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;