"use client"
import React, { useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import './styles.css';
import { CategoryRoot } from '@/types/category.type';
import Link from 'next/link';
import { categoryContext } from '@/context/CategoryContext';

const CategorySwiper = ({ categories }: { categories: CategoryRoot[] }) => {
    const { selectCategory } = useContext(categoryContext);

    const handleCategoryClick = (category: CategoryRoot) => {
        selectCategory(category);
    };

    return (
        <div className='bg-white rounded-2xl shadow-lg p-6'>
            <Swiper
                spaceBetween={20}
                slidesPerView={2}
                breakpoints={{
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                }}
                className="category-swiper"
            >
                {categories.map((category, idx: number) =>
                    <SwiperSlide key={idx}>
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
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    )
}

export default CategorySwiper