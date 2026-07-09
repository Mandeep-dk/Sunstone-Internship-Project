import React from 'react'

function Navbar() {
    return (
        <>
        <div className="bg-gray-800 px-10 py-2">

            <div className="flex justify-between  items-center">

                <div className="flex gap-10">

                    <p className="text-2xl text-white font-bold">MarketPlace</p>
                    <input type="text" placeholder="Search items" className="border  rounded-sm p-3 w-80 h-8 bg-white"></input>
                </div>

                <div className="flex text-white gap-10 font-bold">

                    <p>Profile</p>
                    <p>Wishlist</p>
                    <p>Cart</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Navbar