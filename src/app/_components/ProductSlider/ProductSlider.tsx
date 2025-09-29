"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface ProductSliderProps {
  images: string[];
  title: string;
}

const ProductSlider = ({ images, title }: ProductSliderProps) => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      pagination={{ clickable: true }}
      modules={[Pagination, Navigation]}
      className="product-image-slider"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <Image 
            alt={`${title} ${index + 1}`} 
            width={500} 
            height={500} 
            src={image} 
            className='w-full h-[400px] object-cover rounded-lg' 
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ProductSlider