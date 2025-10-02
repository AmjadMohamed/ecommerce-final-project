"use client"

import { SessionProvider } from 'next-auth/react'
import React from 'react'
import CartContextProvider from './context/CartContext'
import WishlistContextProvider from './context/WishlistContext'
import CategoryContextProvider from './context/CategoryContext'
import BrandsContextProvider from './context/BrandsContext'

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <SessionProvider>
                <CartContextProvider>
                    <WishlistContextProvider>
                        <CategoryContextProvider>
                            <BrandsContextProvider>
                                {children}
                            </BrandsContextProvider>
                        </CategoryContextProvider>
                    </WishlistContextProvider>
                </CartContextProvider>
            </SessionProvider>
        </div>
    )
}

export default Providers
