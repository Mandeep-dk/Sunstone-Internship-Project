import React from 'react'
import { Link } from 'react-router-dom'

function Carousel() {
    return (
        <section className="bg-slate-900">
            <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24 text-center">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-teal-400 mb-4">
                    Buy &amp; sell locally
                </p>
                <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
                    Great finds, closer than
                    <br className="hidden sm:block" />
                    you think
                </h1>
                <p className="text-slate-400 text-base md:text-lg mt-5 max-w-xl mx-auto">
                    Browse thousands of listings from sellers near you, or list
                    something of your own in minutes.
                </p>
                <div className="mt-8 flex items-center justify-center gap-3">
                    <Link
                        to="/products"
                        className="px-6 py-3 rounded-md bg-teal-600 text-white text-sm font-medium hover:bg-teal-500 transition"
                    >
                        Start browsing
                    </Link>
                    <Link
                        to="/sell"
                        className="px-6 py-3 rounded-md border border-slate-600 text-slate-200 text-sm font-medium hover:border-slate-400 hover:text-white transition"
                    >
                        Sell an item
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Carousel