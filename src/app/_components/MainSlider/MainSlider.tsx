"use client"
import React from 'react'
import Image from 'next/image'
import bannerImage1 from './../../../../public/Assets/screens/slider/slider-2.jpeg'
import bannerImage2 from './../../../../public/Assets/screens/slider/grocery-banner-2.jpeg'

import sliderImage1 from './../../../../public/Assets/screens/slider/slider-image-1.jpeg'
import sliderImage2 from './../../../../public/Assets/screens/slider/slider-image-2.jpeg'
import sliderImage3 from './../../../../public/Assets/screens/slider/slider-image-3.jpeg'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import './styles.css';

const MainSlider = () => {
    return (
        <div className='mb-10 grid grid-cols-1 lg:grid-cols-3 gap-6'>

            <div className='lg:col-span-2'>
                <div className='relative rounded-2xl overflow-hidden shadow-xl'>
                    <Swiper
                        spaceBetween={0}
                        slidesPerView={1}
                        pagination={{
                            clickable: true,
                            bulletClass: 'swiper-pagination-bullet bg-white/50',
                            bulletActiveClass: 'swiper-pagination-bullet-active bg-white'
                        }}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        modules={[Pagination, Autoplay]}
                        className="main-slider"
                    >
                        <SwiperSlide>
                            <div className='relative h-[400px] md:h-[500px]'>
                                <Image
                                    className='w-full h-full object-cover'
                                    src={sliderImage1}
                                    alt='Fresh vegetables and fruits'
                                />
                                <div className='absolute inset-0 bg-black/20'></div>
                                <div className='absolute bottom-6 left-6 text-white'>
                                    <h3 className='text-2xl md:text-3xl font-bold mb-2'>Fresh Organic Produce</h3>
                                    <p className='text-lg opacity-90'>Shop the finest selection of organic fruits and vegetables</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='relative h-[400px] md:h-[500px]'>
                                <Image
                                    className='w-full h-full object-cover'
                                    src={sliderImage2}
                                    alt='Premium grocery items'
                                />
                                <div className='absolute inset-0 bg-black/20'></div>
                                <div className='absolute bottom-6 left-6 text-white'>
                                    <h3 className='text-2xl md:text-3xl font-bold mb-2'>Premium Quality</h3>
                                    <p className='text-lg opacity-90'>Handpicked products for the best quality and taste</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='relative h-[400px] md:h-[500px]'>
                                <Image
                                    className='w-full h-full object-cover'
                                    src={sliderImage3}
                                    alt='Fast delivery service'
                                />
                                <div className='absolute inset-0 bg-black/20'></div>
                                <div className='absolute bottom-6 left-6 text-white'>
                                    <h3 className='text-2xl md:text-3xl font-bold mb-2'>Fast Delivery</h3>
                                    <p className='text-lg opacity-90'>Get your groceries delivered fresh to your doorstep</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>

            <div className='lg:col-span-1 space-y-4'>
                <div className='relative rounded-xl overflow-hidden shadow-lg group cursor-pointer'>
                    <Image
                        className='h-[240px] w-full object-cover group-hover:scale-105 transition-transform duration-300'
                        src={bannerImage1}
                        alt='Special offers banner'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>
                    <div className='absolute bottom-4 left-4 text-white'>
                        <h4 className='text-lg font-semibold mb-1'>Special Offers</h4>
                        <p className='text-sm opacity-90'>Up to 50% off</p>
                    </div>
                </div>
                <div className='relative rounded-xl overflow-hidden shadow-lg group cursor-pointer'>
                    <Image
                        className='h-[240px] w-full object-cover group-hover:scale-105 transition-transform duration-300'
                        src={bannerImage2}
                        alt='New arrivals banner'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>
                    <div className='absolute bottom-4 left-4 text-white'>
                        <h4 className='text-lg font-semibold mb-1'>New Arrivals</h4>
                        <p className='text-sm opacity-90'>Fresh products daily</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainSlider
