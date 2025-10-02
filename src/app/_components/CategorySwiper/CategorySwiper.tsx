"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import './styles.css';
import { CategoryRoot } from '@/types/category.type';
import CategoryItem from '../CategoryItem/CategoryItem';

const CategorySwiper = ({ categories }: { categories: CategoryRoot[] }) => {

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
                        <CategoryItem category={category} />
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    )
}

export default CategorySwiper