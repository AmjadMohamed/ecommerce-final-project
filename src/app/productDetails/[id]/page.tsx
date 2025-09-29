import GetSingleProduct from '@/apis/singleProduct';
import AddCartButton from '@/app/_components/AddToCartButton/AddCartButton';
import ProductSlider from '@/app/_components/ProductSlider/ProductSlider';
import WishlistHeart from '@/app/_components/WishlistHeart/WishlistHeart';
import { ProductRoot } from '@/types/product.type';
import React from 'react'

const ProductDetails = async ({ params }: { params: { id: string } }) => {

  const { id } = await params;

  const product: ProductRoot = await GetSingleProduct(id);
  console.log(product);

  // Combine imageCover with additional images
  const allImages = [product.imageCover, ...(product.images || [])];

  return (
    <div className='w-full px-5 md:w-[80%] md:p-0 mx-auto my-20 flex flex-col md:flex-row items-center'>
      <div className='w-full md:w-1/3'>
        <ProductSlider images={allImages} title={product.title} />
      </div>
      <div className='w-full md:w-2/3 m-10 md:m-0 ps-10'>
        <div className="flex items-center justify-between mb-4">
          <h2 className='text-xl font-bold'>{product.title}</h2>
          <WishlistHeart productId={product._id} />
        </div>
        <p className='my-5'>{product.description}</p>
        <p className='my-5'>{product.category.name}</p>
        <div className="w-full flex flex-row justify-between items-center">
          <p>{product.price} EGP</p>
          <p>{product.ratingsAverage} <i className="fa-solid fa-star text-yellow-300"></i></p>
        </div>

        <AddCartButton id={product._id} />
      </div>
    </div>
  )
}

export default ProductDetails