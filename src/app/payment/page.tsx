"use client"

import { cashPaymentAction } from '@/apis/PaymentActions/cashPayment'
import { onlinePaymentAction } from '@/apis/PaymentActions/onlinePayment'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cartContext } from '@/context/CartContext'
import { paymentSchema, PaymentSchemaType } from '@/schema/Payment.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const Payment = () => {


  const { cartId, ResetDataAfterPayment } = useContext(cartContext) as {
    cartId: string;
    ResetDataAfterPayment: () => void;
  };
  const router = useRouter()
  const form = useForm<PaymentSchemaType>(
    {
      defaultValues: {
        details: "",
        phone: "",
        city: ""
      },
      resolver: zodResolver(paymentSchema)
    }
  )

  async function cashPayment(val: PaymentSchemaType) {
    const values = {
      shippingAddress: {
        "details": val.details,
        "phone": val.phone,
        "city": val.city
      }
    }

    try {
      const data = await cashPaymentAction(cartId, values);

      toast.success(data.status, {
        position: "top-center",
        duration: 3000,
        icon: <i className="fa-solid fa-circle-check text-green-500"></i>
      });

      ResetDataAfterPayment();
      router.push("/allorders");
      console.log(`payment ${data}`);

    }
    catch (error) {
      toast.error("Failed", {
        position: "top-center",
        duration: 3000,
        icon: <i className="fa-solid fa-circle-xmark text-red-500"></i>
      })

      console.log(error);
    }
  }

  async function onlinePayment(val: PaymentSchemaType) {
    const values = {
      shippingAddress: {
        "details": val.details,
        "phone": val.phone,
        "city": val.city
      }
    }

    console.log(`cartID: ${cartId}`);

    try {
      const data = await onlinePaymentAction(cartId, values);
      console.log(data);

      toast.success(data.status, {
        position: "top-center",
        duration: 3000,
        icon: <i className="fa-solid fa-circle-check text-green-500"></i>
      });

      if (data.status === "success") {
        window.location.href = data.session.url;
      }

    }
    catch (error) {
      toast.error("Failed", {
        position: "top-center",
        duration: 3000,
        icon: <i className="fa-solid fa-circle-xmark text-red-500"></i>
      })

      console.log(error);
    }
  }

  return (
    <div className='md:w-1/2 w-full md:px-0 px-5 my-10 mx-auto'>
      <h1 className='mb-10 text-center text-3xl font-bold'>Payment</h1>
      <form>
        <div className='mb-4'>
          <label htmlFor='details' className='block text-sm font-medium mb-2'>Address Details</label>
          <Input
            {...form.register('details')}
            type='text'
            id="details"
            className='w-full'
            placeholder='Enter your full address'
          />
          {form.formState.errors.details && (
            <p className='text-red-500 text-sm mt-1'>{form.formState.errors.details.message}</p>
          )}
        </div>

        <div className='mb-4'>
          <label htmlFor='phone' className='block text-sm font-medium mb-2'>Phone Number</label>
          <Input
            {...form.register('phone')}
            type='tel'
            id="phone"
            className='w-full'
            placeholder='01XXXXXXXXX'
          />
          {form.formState.errors.phone && (
            <p className='text-red-500 text-sm mt-1'>{form.formState.errors.phone.message}</p>
          )}
        </div>

        <div className='mb-5'>
          <label htmlFor='city' className='block text-sm font-medium mb-2'>City</label>
          <Input
            {...form.register('city')}
            type='text'
            id="city"
            className='w-full'
            placeholder='Enter your city'
          />
          {form.formState.errors.city && (
            <p className='text-red-500 text-sm mt-1'>{form.formState.errors.city.message}</p>
          )}
        </div>

        <div className='flex gap-4'>
          <Button
            type='button'
            className='bg-green-500 hover:bg-green-600 cursor-pointer'
            onClick={form.handleSubmit(cashPayment)}
          >
            Cash Payment
          </Button>
          <Button
            type='button'
            className='bg-green-500 hover:bg-green-600  cursor-pointer'
            onClick={form.handleSubmit(onlinePayment)}
          >
            Online Payment
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Payment
