"use client"

import { categoryContext } from '@/context/CategoryContext';
import { CategoryRoot } from '@/types/category.type'
import Link from 'next/link'
import React, { useContext } from 'react'
import Image from 'next/image';

const CategoryItem = ({ category }: { category: CategoryRoot }) => {

    const { selectCategory } = useContext(categoryContext);

    const handleCategoryClick = (category: CategoryRoot) => {
        selectCategory(category);
    };


    return (
        <Link
            href="/subCategory"
            onClick={() => handleCategoryClick(category)}
            className='group block text-center'
        >
            <div className='relative rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300'>
                <Image
                    width={500}
                    height={500}
                    src={category.image}
                    alt={`${category.name} category`}
                    className='h-[180px] w-full object-cover group-hover:scale-105 transition-transform duration-300'
                />
                <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300'></div>
            </div>
            <p className='mt-3 font-medium text-gray-800 group-hover:text-green-600 transition-colors duration-300'>
                {category.name}
            </p>
        </Link>
    )
}

export default CategoryItem