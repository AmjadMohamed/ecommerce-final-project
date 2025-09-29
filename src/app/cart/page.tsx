"use client"

import { cartContext } from '@/context/CartContext'
import React, { useContext } from 'react'
import Loading from '../loading';
import { Button } from '@/components/ui/button';
import { ProductCart } from '@/types/cart.type';
import Image from 'next/image';
import { toast } from 'sonner';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';

const Cart = () => {

  const { isLoading, totalCartPrice, products, removeCartItem, updateCartItemQuantity, isItemQuantityLoading, clearCart } = useContext(cartContext);

  async function removeItem(id: string) {
    const data = await removeCartItem(id);

    if (data && data.status === "success") {
      toast.success("Item removed successfully", {
        position: "top-center",
        duration: 3000,
        icon: <i className="fa-solid fa-circle-check text-green-500"></i>
      });
    }
    else {
      toast.error("Failed to remove item", {
        position: "top-center",
        duration: 3000,
        icon: <i className="fa-solid fa-circle-xmark text-red-500"></i>
      })
    }

  };

  async function updateItemQuantity(id: string, count: number) {
    const data = await updateCartItemQuantity(id, count);

    if (data && data.status === "success") {
      toast.success("Item Quantity updated successfully", {
        position: "top-center",
        duration: 3000,
        icon: <i className="fa-solid fa-circle-check text-green-500"></i>
      });
    }
    else {
      toast.error("Failed to update quantity", {
        position: "top-center",
        duration: 3000,
        icon: <i className="fa-solid fa-circle-xmark text-red-500"></i>
      })
    }

  };

  if (isLoading) {
    return <Loading />
  }

  if (products.length == 0) {
    return <div className='h-screen w-full flex justify-center items-center'>
      <div className="text-center">
        <div className="mb-6">
          <i className="fa-solid fa-shopping-cart text-6xl text-gray-300"></i>
        </div>
        <h2 className="text-2xl font-semibold  text-green-600 mb-2">No Items Found</h2>
        <p className="text-gray-500">Your cart is empty. Start shopping to add items!</p>
      </div>
    </div>
  }

  return (
    <div className='w-full md:w-[80%] mx-auto my-10 px-5 md:px-0 bg-slate-100'>
      <div className='p-5'>
        <h1 className='text-2xl font-bold'>Shop Cart</h1>

        {/* Cart Summary */}
        <div className='bg-white p-4 rounded-lg my-6 border-l-4 border-green-500'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
            <div>
              <p className='font-mono text-green-500 text-xl font-bold'>
                Total Price: {totalCartPrice} EGP
              </p>
              <p className='text-gray-600 text-sm mt-1'>
                {products.length} {products.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <div className='flex gap-3 mt-4 md:mt-0'>
              <Button
                variant="outline"
                className='border-red-300 text-red-600 hover:bg-red-50 cursor-pointer'
                onClick={clearCart}
              >
                Clear Cart
              </Button>
              <Button className='bg-green-500 hover:bg-green-600'>
                <Link href={"/payment"}>
                  Proceed to Payment
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Cart Items */}
        <div className='bg-white rounded-lg p-5'>
          <h2 className='font-semibold text-lg mb-4 pb-2 border-b border-green-500'>
            Cart Items
          </h2>
          <div className='space-y-4'>
            {products.map(function (product: ProductCart, idx: number) {
              return (
                <div key={idx} className='flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0'>
                  <div className='flex items-center gap-6'>
                    <div className='relative'>
                      <Image
                        alt={product.product.title}
                        src={product.product.imageCover}
                        height={120}
                        width={120}
                        className='rounded-lg object-cover'
                      />
                    </div>

                    <div className='flex-1'>
                      <h3 className='font-medium text-gray-800 mb-2 line-clamp-2'>
                        {product.product.title}
                      </h3>
                      <p className='text-green-500 font-semibold text-lg mb-3'>
                        {product.price} EGP
                      </p>
                      <div className='flex items-center gap-4'>
                        <button
                          className='text-red-500 hover:text-red-700 transition-colors flex items-center gap-2 text-sm cursor-pointer'
                          onClick={() => { removeItem(product.product._id) }}
                        >
                          <i className="fas fa-trash"></i>
                          Remove
                        </button>
                        {product.product.category && (
                          <span className='text-xs bg-gray-100 px-2 py-1 rounded'>
                            {product.product.category.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-col items-end gap-3'>
                    <div className='flex items-center gap-3 bg-gray-50 rounded-lg p-2'>
                      <button
                        className='w-8 h-8 flex items-center justify-center bg-white border border-green-500 rounded-md font-bold text-green-600 hover:bg-green-50 transition-colors cursor-pointer'
                        onClick={() => updateItemQuantity(product.product._id, product.count - 1)}
                      >
                        -
                      </button>

                      <span className='font-bold min-w-[2rem] flex items-center justify-center'>
                        {isItemQuantityLoading === product.product._id ? (
                          <Loader2Icon className="animate-spin w-5 h-5" />
                        ) : (
                          product.count
                        )}
                      </span>

                      <button
                        className='w-8 h-8 flex items-center justify-center bg-white border border-green-500 rounded-md font-bold text-green-600 hover:bg-green-50 transition-colors cursor-pointer'
                        onClick={() => updateItemQuantity(product.product._id, product.count + 1)}
                      >
                        +
                      </button>
                    </div>
                    <div className='text-right'>
                      <p className='text-gray-600 text-sm'>Subtotal</p>
                      <p className='font-bold text-green-600'>
                        {product.price * product.count} EGP
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
