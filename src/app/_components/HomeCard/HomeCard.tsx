import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from 'next/link';
import { ProductRoot } from '@/types/product.type';
import AddCartButton from '../AddToCartButton/AddCartButton';
import WishlistHeart from '../WishlistHeart/WishlistHeart';

const HomeCard = ({ product }: { product: ProductRoot }) => {
    return (
        <div className="group h-full">
            <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow duration-300 bg-white rounded-xl h-full flex flex-col">
                <div className="relative flex flex-col h-full">
                    <div className="absolute top-3 right-3 z-10">
                        <WishlistHeart productId={product._id} />
                    </div>
                    <Link href={`/productDetails/${product.id}`} className="block flex-1 flex flex-col">
                        <CardHeader className="p-0 relative overflow-hidden">
                            <div className="aspect-square relative">
                                <Image 
                                    alt={product.title} 
                                    width={500} 
                                    height={500} 
                                    src={product.imageCover}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/0"></div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 flex-1 flex flex-col">
                            <div className="mb-2">
                                <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                                    {product.category.name}
                                </span>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors duration-300 flex-1">
                                {product.title}
                            </h3>
                            <div className="flex items-center gap-1 mb-3">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <i 
                                            key={i} 
                                            className={`fa-solid fa-star text-sm ${
                                                i < Math.floor(product.ratingsAverage) 
                                                    ? 'text-yellow-400' 
                                                    : 'text-gray-300'
                                            }`}
                                        ></i>
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600 ml-1">
                                    ({product.ratingsAverage})
                                </span>
                            </div>
                        </CardContent>
                    </Link>
                    <CardFooter className="p-4 pt-0 mt-auto">
                        <div className="w-full flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <span className="text-2xl font-bold text-green-600">
                                    {product.price} EGP
                                </span>
                            </div>
                            <AddCartButton id={product._id} />
                        </div>
                    </CardFooter>
                </div>
            </Card>
        </div>
    )
}

export default HomeCard
