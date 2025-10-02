import getAllCategories from '@/apis/allCategories';
import { CategoryRoot } from '@/types/category.type';
import React from 'react'
import CategoryItem from '../_components/CategoryItem/CategoryItem';

const Categories = async () => {

    const data: CategoryRoot[] = await getAllCategories();

    return (
        <div className='w-full md:w-[80%] mx-auto my-10 px-5 md:px-0 bg-slate-100'>
            <div className='p-5'>
                <div className='text-center mb-8'>
                    <h1 className='text-4xl font-bold'>
                        All Categories
                    </h1>
                    <p className='text-gray-600 text-lg'>Explore our diverse range of product categories</p>
                    <div className='flex justify-center mt-4'>
                        <div className='w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full'></div>
                    </div>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                    {data.map((category: CategoryRoot, idx: number) => (
                        <CategoryItem key={idx} category={category} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Categories