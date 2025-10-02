"use client"

import React from 'react'
import Image from 'next/image'
import { BrandsRoot } from '@/types/brands.type'

interface BrandModalProps {
    brand: BrandsRoot | null
    isOpen: boolean
    onClose: () => void
}

const BrandModal = ({ brand, isOpen, onClose }: BrandModalProps) => {
    if (!isOpen || !brand) return null

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Header */}
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 text-center">Brand Details</h2>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Brand Image */}
                    <div className="flex justify-center mb-6">
                        <div className="relative w-48 h-48 rounded-3xl overflow-hidden shadow-lg">
                            <Image
                                src={brand.image}
                                alt={brand.name}
                                width={500}
                                height={500}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    {/* Brand Information */}
                    <div className="space-y-4">
                        <div className="text-center">
                            <h3 className="text-3xl font-bold text-gray-800 mb-2">{brand.name}</h3>
                            <p className="text-gray-600 text-sm uppercase tracking-wider">Brand</p>
                        </div>

                        {/* Brand Details */}
                        <div className="bg-gray-50 rounded-3xl p-4 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">Slug:</span>
                                <span className="text-gray-800">{brand.slug}</span>
                            </div>

                            {brand.createdAt && (
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 font-medium">Created:</span>
                                    <span className="text-gray-800">
                                        {new Date(brand.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            )}

                            {brand.updatedAt && (
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 font-medium">Updated:</span>
                                    <span className="text-gray-800">
                                        {new Date(brand.updatedAt).toLocaleDateString()}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BrandModal
