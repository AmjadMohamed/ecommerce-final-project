import { getUserOrderAction } from '@/apis/PaymentActions/fetchUserOrders'
import { OrderRoot } from '@/types/order.type';
import Image from 'next/image';
import React from 'react'

const AllOrders = async () => {

    const data: OrderRoot = await getUserOrderAction();

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (!data || data.length === 0) {
        return (
            <div className="text-center h-screen flex flex-col justify-center items-center">
                <div className="mb-4">
                    <i className="fa-solid fa-receipt text-6xl text-gray-300"></i>
                </div>
                <h2 className="text-2xl font-semibold text-green-600 mb-2">No orders found</h2>
                <p className="text-gray-500 mb-6">You haven&apos;t placed any orders yet!</p>
            </div>
        );
    }

    return (
        <div className='w-full md:w-[80%] mx-auto my-10 px-5 md:px-0 bg-slate-100'>
            <div className='p-5'>
                <h1 className='text-2xl font-bold'>My Orders</h1>

                <div className='mt-7'>
                    {data.map((order) => (
                        <div key={order._id} className='mb-8 bg-white p-5 rounded-lg'>
                            <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-4 pb-4 border-b border-green-500'>
                                <div>
                                    <h2 className='font-bold text-lg'>Order #{order.id}</h2>
                                    <p className='text-gray-600'>{formatDate(order.createdAt)}</p>
                                </div>
                                <div className='flex gap-3 mt-2 md:mt-0'>
                                    <span className={`px-3 py-1 rounded text-sm font-medium ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                        {order.isPaid ? 'Paid' : 'Pending'}
                                    </span>
                                    <span className={`px-3 py-1 rounded text-sm font-medium ${order.isDelivered ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {order.isDelivered ? 'Delivered' : 'Processing'}
                                    </span>
                                </div>
                            </div>

                            <div className='space-y-4'>
                                {order.cartItems.map((item) => (
                                    <div key={item._id} className='flex items-center justify-between py-3 border-b border-gray-200'>
                                        <div className='flex items-center gap-7'>
                                            <Image
                                                alt={item.product.title}
                                                src={item.product.imageCover}
                                                height={100}
                                                width={100}
                                                className='rounded'
                                            />
                                            <div>
                                                <h3 className='font-medium'>{item.product.title}</h3>
                                                <p className='my-2 text-green-500'>Price: {item.price} EGP</p>
                                                <p className='text-gray-600'>Quantity: {item.count}</p>
                                            </div>
                                        </div>
                                        <div className='text-right'>
                                            <p className='font-bold text-green-600'>
                                                {item.price * item.count} EGP
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className='mt-4 pt-4 border-t border-green-500'>
                                <div className='flex justify-between items-center'>
                                    <div>
                                        <p className='text-gray-600'>Payment Method: {order.paymentMethodType}</p>
                                        {order.shippingAddress && (
                                            <p className='text-gray-600'>
                                                Shipping to: {order.shippingAddress.city}, {order.shippingAddress.details}
                                            </p>
                                        )}
                                    </div>
                                    <div className='text-right'>
                                        <p className='font-mono text-green-500 text-xl font-bold'>
                                            Total: {order.totalOrderPrice} EGP
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllOrders
