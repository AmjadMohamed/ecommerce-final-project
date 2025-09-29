import { GetAllBrands } from '@/apis/BrandsActions/getAllBrands'
import { BrandsRoot } from '@/types/brands.type';
import React from 'react'
import Image from "next/image";

const Brands = async () => {

  const { data }: { data: BrandsRoot[] } = await GetAllBrands();
  console.log(data);

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
          {data.map((brand: BrandsRoot, idx: number) => (
            <div key={idx} className='bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow'>
              <div className='aspect-square mb-3 overflow-hidden rounded-lg'>
                <Image
                  alt={brand.name}
                  width={300}
                  height={300}
                  src={brand.image}
                  className='w-full h-full object-contain'
                />
              </div>
              <div className='text-center font-medium text-gray-800 truncate'>
                {brand.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Brands
