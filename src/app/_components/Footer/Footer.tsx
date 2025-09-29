"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSession } from 'next-auth/react';

const Footer = () => {

    const { data: session, status } = useSession();

    return (
        <>
            {status === "authenticated" &&
                <footer className='bg-gray-100 border-t border-gray-200 mt-auto'>
                    <div className='container mx-auto px-4 py-4'>
                        <div className='p-6'>

                            <div className='mb-8'>
                                <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                                    Get the FreshCart app
                                </h3>
                                <p className='text-gray-600 mb-4'>
                                    We will send you a link, open it on your phone to download the app.
                                </p>


                                <div className='flex flex-col sm:flex-row gap-3 mb-6'>
                                    <Input
                                        type="email"
                                        placeholder="Email.."
                                        className="flex-1 border-gray-300"
                                    />
                                    <Button className='bg-green-500 hover:bg-green-600 text-white px-6 py-2 whitespace-nowrap cursor-pointer'>
                                        Share App Link
                                    </Button>
                                </div>
                            </div>

                            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pt-6 border-t border-gray-200'>

                                <div className='flex flex-col sm:flex-row sm:items-center gap-4'>
                                    <span className='text-gray-600 font-medium'>Payment Partners</span>
                                    <div className='flex items-center gap-3'>
                                        <i className="fab fa-amazon text-2xl"></i>
                                        <i className="fab fa-cc-amex text-2xl"></i>
                                        <i className="fab fa-cc-mastercard text-2xl"></i>
                                        <i className="fab fa-cc-paypal text-2xl"></i>
                                        <i className="fab fa-cc-visa text-2xl"></i>
                                    </div>
                                </div>

                                <div className='flex flex-col sm:flex-row sm:items-center gap-4'>
                                    <span className='text-gray-600 font-medium'>Get deliveries with FreshCart</span>
                                    <div className='flex items-center gap-3'>
                                        <div className='bg-black text-white px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-gray-800 transition-colors'>
                                            <div className='text-2xl'>
                                                <i className="fab fa-apple"></i>
                                            </div>
                                            <div>
                                                <div className='text-[8px]'>Available on the</div>
                                                <div className='text-sm font-semibold'>App Store</div>
                                            </div>
                                        </div>

                                        <div className='bg-black text-white px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-gray-800 transition-colors'>
                                            <div className='text-2xl'>
                                                <i className="fab fa-google-play"></i>
                                            </div>
                                            <div>
                                                <div className='text-[8px]'>Get it on</div>
                                                <div className='text-sm font-semibold'>Google Play</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>}
        </>

    )
}

export default Footer
