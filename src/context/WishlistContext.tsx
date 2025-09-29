import { addProductToWishlistAction } from '@/apis/WishlistActions/addProductToWishlist';
import { removeProductFromWishlistAction } from '@/apis/WishlistActions/removeProductFromWishlist';
import { getUserWishlistAction } from '@/apis/WishlistActions/getUserWishlist';
import { ProductRoot } from '@/types/product.type';
import React, { createContext, useEffect, useState } from 'react'

interface WishlistContextType {
    numOfWishlistItems: number;
    products: ProductRoot[];
    isLoading: boolean;
    addProductToWishlist: (id: string) => Promise<unknown>;
    removeWishlistItem: (id: string) => Promise<unknown>;
    isInWishlist: (id: string) => boolean;
    toggleWishlist: (id: string) => Promise<unknown>;
    getUserWishlistData: () => Promise<void>;
}

export const wishlistContext = createContext<WishlistContextType>({} as WishlistContextType)

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
        } catch (_error) {
            setIsLoading(false);
        }
    }

    async function removeWishlistItem(id: string) {
        try {
            const data = await removeProductFromWishlistAction(id);
            getUserWishlistData();
            return data;
        } catch (_error) {
            throw _error;
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