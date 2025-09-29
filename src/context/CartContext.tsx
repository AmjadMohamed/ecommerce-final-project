import { addToCartAction } from '@/apis/CartActions/addToCart';
import { clearCartAction } from '@/apis/CartActions/clearCart';
import { getUserCartAction } from '@/apis/CartActions/getUserCart'
import { removeCartItemAction } from '@/apis/CartActions/removeCartItem';
import { updateCartItemQuantityAction } from '@/apis/CartActions/updateCartItemQuantity';
import { CartRoot, ProductCart } from '@/types/cart.type';
import React, { createContext, useEffect, useState } from 'react'

interface CartContextType {
    numOfCartItems: number;
    products: ProductCart[];
    totalCartPrice: number;
    isLoading: boolean;
    addProductToCart: (id: string) => Promise<CartRoot | undefined>;
    removeCartItem: (id: string) => Promise<CartRoot | undefined>;
    updateCartItemQuantity: (id: string, count: number) => Promise<CartRoot | undefined>;
    isItemQuantityLoading: string;
    clearCart: () => Promise<void>;
    cartId: string;
    ResetDataAfterPayment: () => void;
}

export const cartContext = createContext<CartContextType>({} as CartContextType)


const CartContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [products, setProducts] = useState<ProductCart[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isItemQuantityLoading, setIsItemQuantityLoading] = useState("");
    const [cartId, setCartId] = useState("")

    async function addProductToCart(id: string) {

        try {
            const data = await addToCartAction(id);
            getUserCart();
            return data;

        }
        catch (_error) {
            // Error handled silently
        }
    }

    async function getUserCart() {

        setIsLoading(true);
        try {
            const data: CartRoot = await getUserCartAction();
            setNumOfCartItems(data.numOfCartItems);
            setTotalCartPrice(data.data.totalCartPrice);
            setProducts(data.data.products);
            setCartId(data.cartId);
            setIsLoading(false);

        } catch (_error) {
            setIsLoading(false);
        }
    }

    async function removeCartItem(id: string) {
        try {
            const data: CartRoot = await removeCartItemAction(id);
            setNumOfCartItems(data.numOfCartItems);
            setTotalCartPrice(data.data.totalCartPrice);
            setProducts(data.data.products);
            return data;

        } catch (_error) {
            // Error handled silently
        }
    }

    async function updateCartItemQuantity(id: string, count: number) {
        setIsItemQuantityLoading(id);
        try {
            const data = await updateCartItemQuantityAction(id, count);
            setNumOfCartItems(data.numOfCartItems);
            setTotalCartPrice(data.data.totalCartPrice);
            setProducts(data.data.products);
            setIsItemQuantityLoading("");
            return data;

        } catch (_error) {
            setIsItemQuantityLoading("");
        }
    }

    async function clearCart() {
        try {
            await clearCartAction();
            setNumOfCartItems(0);
            setTotalCartPrice(0);
            setProducts([]);
        } catch (_error) {
            // Error handled silently
        }
    }

    function ResetDataAfterPayment() {
        setCartId("");
        setNumOfCartItems(0);
        setTotalCartPrice(0);
        setProducts([]);
    }


    useEffect(function () {
        getUserCart();
    }, [])


    return (
        <cartContext.Provider value={{
            numOfCartItems,
            products,
            totalCartPrice,
            isLoading,
            addProductToCart,
            removeCartItem,
            updateCartItemQuantity,
            isItemQuantityLoading,
            clearCart,
            cartId,
            ResetDataAfterPayment
        }}>
            {children}
        </cartContext.Provider>
    )
}

export default CartContextProvider
