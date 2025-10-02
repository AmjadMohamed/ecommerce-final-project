"use client"

import { brandsContext } from '@/context/BrandsContext';
import { BrandsRoot } from '@/types/brands.type'
import React, { useContext } from 'react'
import Image from 'next/image';

const BrandItem = ({ brand }: { brand: BrandsRoot }) => {

    const { selectBrand } = useContext(brandsContext);

    const handleClick = () => {
        selectBrand(brand._id);
    }

    return (
        <div 
            className='group block text-center cursor-pointer'
            onClick={handleClick}
        >
            <div className='relative rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300'>
                <Image
                    width={500}
                    height={500}
                    src={brand.image}
                    alt={`${brand.name} brand`}
                    className='h-[180px] w-full object-cover group-hover:scale-105 transition-transform duration-300'
                />
                <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300'></div>
            </div>
            <p className='mt-3 font-medium text-gray-800 group-hover:text-green-600 transition-colors duration-300'>
                {brand.name}
            </p>
        </div>
    )
}

export default BrandItem
