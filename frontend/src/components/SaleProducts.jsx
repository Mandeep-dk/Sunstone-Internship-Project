import React from 'react'
import product1 from '../assets/product1.jpeg'
import product2 from '../assets/product2.jpeg'
import product3 from '../assets/product3.jpeg'
import product4 from '../assets/product4.jpeg'

function SaleProducts() {
    const products = [
        {
            image: product1,
            name: "Kotak camera",
        },
        {
            image: product2,
            name: "Rubiks cube",
        },
        {
            image: product3,
            name: "Portable fan",
        },
        {
            image: product4,
            name: "Cap",
        },

    ];
    return (
        <>
            <div className="px-10 mt-20">

                <div className='flex flex-col justify-between bg-orange-600 rounded-xl p-6 shadow-lg'>
                    <div>

                        <h2 className="text-2xl font-bold mb-6 text-white">
                            Trending Products
                        </h2>
                    </div>
                    <div className="flex justify-between bg-white rounded-xl p-6 shadow-lg">

                        {products.map((img, index) => (
                            <div>

                            <img
                                src={img.image}
                                alt={img.name}
                                className="w-30 h-30 flex-shrink-0 object-cover object-center"
                            />
                            <p className="px-6">
                                {img.name}
                            </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SaleProducts