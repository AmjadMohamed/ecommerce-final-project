"use client"

import { SessionProvider } from 'next-auth/react'
import React from 'react'
import CartContextProvider from './context/CartContext'
import WishlistContextProvider from './context/WishlistContext'
import CategoryContextProvider from './context/CategoryContext'

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <SessionProvider>
                <CartContextProvider>
                    <WishlistContextProvider>
                        <CategoryContextProvider>
                            {children}
                        </CategoryContextProvider>
                    </WishlistContextProvider>
                </CartContextProvider>
            </SessionProvider>
        </div>
    )
}

export default Providers
