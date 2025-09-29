"use client"

import React, { useContext } from 'react'
import { wishlistContext } from '@/context/WishlistContext'
import { toast } from 'sonner';

const WishlistHeart = ({ productId }: { productId: string }) => {
    const { isInWishlist, toggleWishlist } = useContext(wishlistContext);

    const handleToggle = async () => {
        try {
            const wasInWishlist = isInWishlist(productId);
            const response = await toggleWishlist(productId);

            if (response && typeof response === 'object' && 'status' in response && response.status === "success") {
                if (wasInWishlist) {
                    toast.success("Item removed from your wishlist", {
                        position: "top-center",
                        duration: 3000,
                        icon: <i className="fa-solid fa-heart-crack text-red-500"></i>
                    });
                } else {
                    toast.success("Item added to your wishlist", {
                        position: "top-center",
                        duration: 3000,
                        icon: <i className="fa-solid fa-heart text-red-500"></i>
                    });
                }
            } else {
                toast.error("Operation failed", {
                    position: "top-center",
                    duration: 3000,
                    icon: <i className="fa-solid fa-circle-xmark text-red-500"></i>
                });
            }
        } catch (error) {
            console.error("Wishlist error:", error);
            toast.error("Something went wrong", {
                position: "top-center",
                duration: 3000,
                icon: <i className="fa-solid fa-circle-xmark text-red-500"></i>
            });
        }
    };

    return (
        <button
            onClick={handleToggle}
            className='rounded-full bg-white p-2 hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg flex items-center justify-center'
        >
            <i className={`fa-heart text-xl ${isInWishlist(productId) ? 'fa-solid text-red-500' : 'fa-regular text-gray-400'} cursor-pointer text-center`}></i>
        </button>
    )
}

export default WishlistHeart