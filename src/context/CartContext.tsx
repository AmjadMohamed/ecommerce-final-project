import { addToCartAction } from '@/apis/CartActions/addToCart';
import { clearCartAction } from '@/apis/CartActions/clearCart';
import { getUserCartAction } from '@/apis/CartActions/getUserCart'
import { removeCartItemAction } from '@/apis/CartActions/removeCartItem';
import { updateCartItemQuantityAction } from '@/apis/CartActions/updateCartItemQuantity';
import { CartRoot } from '@/types/cart.type';
import React, { createContext, useEffect, useState } from 'react'


export const cartContext = createContext({})


const CartContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isItemQuantityLoading, setIsItemQuantityLoading] = useState("");
    const [cartId, setCartId] = useState("")

    async function addProductToCart(id: string) {

        try {
            const data = await addToCartAction(id);
            getUserCart();
            return data;

        }
        catch (error) {
            console.log(error)
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
            console.log(data);
            setIsLoading(false);

        } catch (error) {
            console.log(error);
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

        } catch (error) {
            console.log(error);
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

        } catch (error) {
            console.log(error);
            setIsItemQuantityLoading("");
        }
    }

    async function clearCart() {
        try {
            const data = await clearCartAction();
            setNumOfCartItems(0);
            setTotalCartPrice(0);
            setProducts([]);
        } catch (error) {
            console.log(error);
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
