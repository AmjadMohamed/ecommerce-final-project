"use client"

import { wishlistContext } from '@/context/WishlistContext'
import React, { useContext } from 'react'
import { ProductRoot } from '@/types/product.type';
import HomeCard from '../_components/HomeCard/HomeCard';

const WishList = () => {
    const { products, isLoading } = useContext(wishlistContext);

    if (isLoading) {
        return <div className="flex justify-center items-center h-64">
            <i className="fa-solid fa-spinner fa-spin text-2xl text-green-500"></i>
        </div>
    }

    return (

        <div className="px-5 md:px-0 w-full md:w-[80%] mx-auto mt-10">
            {products?.length > 0 && (
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">My Wishlist</h1>
                    <p className="text-gray-600">
                        {products.length} item{products.length !== 1 ? 's' : ''} in your wishlist
                    </p>
                </div>
            )}

            {products?.length === 0 ? (
                <div className="text-center h-screen flex flex-col justify-center items-center">
                    <div className="mb-4">
                        <i className="fa-regular fa-heart text-6xl text-gray-300"></i>
                    </div>
                    <h2 className="text-2xl font-semibold text-green-600 mb-2">Your wishlist is empty</h2>
                    <p className="text-gray-500 mb-6">Start adding items you love to your wishlist!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-10">
                    {products?.map((product: ProductRoot, idx: number) => (
                        <HomeCard key={idx} product={product} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default WishList;