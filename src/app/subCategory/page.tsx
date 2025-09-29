"use client"
import React, { useContext } from 'react'
import { categoryContext } from '@/context/CategoryContext';
import { CategoryRoot } from '@/types/category.type';

const SubCategory = () => {
    const { selectedCategory, subcategories, isLoading } = useContext(categoryContext);

    return (
        <div className="w-full md:w-[80%] mx-auto px-5 md:px-0">
            {subcategories.length > 0 && (
                <div className="mb-8 mt-10">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        {selectedCategory ? selectedCategory.name : 'Subcategories'}
                    </h1>
                    <p className="text-gray-600">
                        {subcategories.length} subcategor{subcategories.length !== 1 ? 'ies' : 'y'} found
                    </p>
                </div>
            )}

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <i className="fa-solid fa-spinner fa-spin text-2xl text-green-500"></i>
                </div>
            ) : subcategories.length === 0 ? (
                <div className="text-center h-screen flex flex-col justify-center items-center">
                    <div className="mb-4">
                        <i className="fa-solid fa-folder-open text-6xl text-gray-300"></i>
                    </div>
                    <h2 className="text-2xl font-semibold  text-green-600 mb-2">No Subcategories Found</h2>
                    <p className="text-gray-500 mb-6">This category doesn&apos;t have any subcategories yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {subcategories.map((subcategory: CategoryRoot, idx: number) => (
                        <div key={idx} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center mb-10">
                            <div className="mb-4">
                                <i className="fa-solid fa-tags text-4xl text-green-500"></i>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {subcategory.name}
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">
                                {subcategory.slug}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SubCategory