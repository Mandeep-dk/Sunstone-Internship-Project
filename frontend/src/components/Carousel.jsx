import React, { useState } from 'react'
import image1 from '../assets/image1.jpeg'
import image2 from '../assets/image2.jpeg'
import image3 from '../assets/image3.jpeg'

function Carousel() {
    const [current, setCurrent] = useState(0);
    const images = [image1, image2, image3];

    const nextSlide = () => {
        setCurrent((current + 1) % images.length);
    }

    const prevSlide = () => {
        setCurrent((current - 1 + images.length) % images.length);
    }

    return (
        <div className="relative w-full  h-[140px] sm:h-[180px] md:h-[220px] lg:h-[260px] overflow-hidden">      <div
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
        >
            {images.map((img, index) => (
                <img
    src={img}
    alt={`slide-${index}`}
    className="w-full h-full flex-shrink-0 object-contain object-center bg-black"
/>
            ))}
        </div>

            <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-9 h-9 flex items-center justify-center transition"
            >
                ‹
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-9 h-9 flex items-center justify-center transition"
            >
                ›
            </button>


        </div>
    )
}

export default Carousel