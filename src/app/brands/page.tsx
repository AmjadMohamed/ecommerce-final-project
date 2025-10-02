"use client"

import { brandsContext } from '@/context/BrandsContext';
import { BrandsRoot } from '@/types/brands.type';
import React, { useContext } from 'react'
import BrandItem from '../_components/BrandItem/BrandItem';
import BrandModal from '../_components/BrandModal/BrandModal';

const Brands = () => {

  const { brands, selectedBrand, isLoading, isModalOpen, closeModal } = useContext(brandsContext);

  if (isLoading) {
    return (
      <div className="w-full md:w-[80%] mx-auto my-10 px-5 md:px-0 bg-slate-100">
        <div className="p-5 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading brands...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full md:w-[80%] mx-auto my-10 px-5 md:px-0 bg-slate-100'>
      <div className='p-5'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold'>
            All Brands
          </h1>
          <p className='text-gray-600 text-lg'>Discover our premium brand collection</p>
          <div className='flex justify-center mt-4'>
            <div className='w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full'></div>
          </div>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
          {brands.map((brand: BrandsRoot, idx: number) => (
            <BrandItem 
              key={idx} 
              brand={brand}
            />
          ))}
        </div>
      </div>

      {/* Brand Modal */}
      <BrandModal 
        brand={selectedBrand}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  )
}

export default Brands
