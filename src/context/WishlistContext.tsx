import { addProductToWishlistAction } from '@/apis/WishlistActions/addProductToWishlist';
import { removeProductFromWishlistAction } from '@/apis/WishlistActions/removeProductFromWishlist';
import { getUserWishlistAction } from '@/apis/WishlistActions/getUserWishlist';
import { ProductRoot } from '@/types/product.type';
import React, { createContext, useEffect, useState } from 'react'

export const wishlistContext = createContext({})

const WishlistContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [numOfWishlistItems, setNumOfWishlistItems] = useState(0);
    const [products, setProducts] = useState<ProductRoot[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [wishlistIds, setWishlistIds] = useState<string[]>([]);

    async function addProductToWishlist(id: string) {
        try {
            const data = await addProductToWishlistAction(id);
            getUserWishlistData();
            return data;
        }
        catch (error) {
            console.log(error)
            throw error;
        }
    }

    async function getUserWishlistData() {
        setIsLoading(true);
        try {
            const data = await getUserWishlistAction();
            setProducts(data.data);
            setNumOfWishlistItems(data.data.length);
            setWishlistIds(data.data.map((product: ProductRoot) => product._id));
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    async function removeWishlistItem(id: string) {
        try {
            const data = await removeProductFromWishlistAction(id);
            getUserWishlistData();
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    function isInWishlist(id: string): boolean {
        return wishlistIds.includes(id);
    }

    function toggleWishlist(id: string) {
        if (isInWishlist(id)) {
            return removeWishlistItem(id);
        } else {
            return addProductToWishlist(id);
        }
    }

    useEffect(function () {
        getUserWishlistData();
    }, [])

    return (
        <wishlistContext.Provider value={{
            numOfWishlistItems,
            products,
            isLoading,
            addProductToWishlist,
            removeWishlistItem,
            isInWishlist,
            toggleWishlist,
            getUserWishlistData
        }}>
            {children}
        </wishlistContext.Provider>
    )
}

export default WishlistContextProvider