"use client"


import { Button } from '@/components/ui/button'
import { cartContext } from '@/context/CartContext'
import React, { useContext } from 'react'
import { toast } from 'sonner'

const AddCartButton = ({ id }: { id: string }) => {

    const {addProductToCart} = useContext(cartContext);

    async function handleAddToCart() {
        const data = await addProductToCart(id);
        if (data.status === "success") {
            toast.success(data.message, {
                position: "top-center",
                duration: 3000,
                icon: <i className="fa-solid fa-circle-check text-green-500"></i>
            });
        }
        else {
            toast.error("Failed to add to cart", {
                position: "top-center",
                duration: 3000,
                icon: <i className="fa-solid fa-circle-xmark text-red-500"></i>
            })
        }

    }

    return (
        <Button className='bg-green-500 mt-5 w-full hover:bg-green-600 cursor-pointer' onClick={handleAddToCart}>+ add to cart</Button>
    )
}

export default AddCartButton
