import getAllCategories from '@/apis/allCategories';
import React from 'react'
import CategorySwiper from '../CategorySwiper/CategorySwiper';
import { CategoryRoot } from '@/types/category.type';

const CategorySlider = async () => {
    const data: CategoryRoot[] = await getAllCategories();

    return (
        <div className='mb-8'>
            <div className='text-center mb-8'>
                <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-3'>Shop by Category</h2>
                <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
                    Explore our wide range of product categories and find exactly what you need
                </p>
            </div>
            <CategorySwiper categories={data} />
        </div>
    )
}

export default CategorySlider
