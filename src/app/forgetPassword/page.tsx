"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Loader2Icon } from 'lucide-react'
import Link from 'next/link'
import { ForgetPasswordAction } from '@/apis/AuthActions/forgetPassword'
import { forgetPasswordSchema, ForgetPasswordSchemaType } from '@/schema/ForgetPassword.schema'

const ForgetPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const form = useForm<ForgetPasswordSchemaType>({
        defaultValues: {
            email: "",
        },
        resolver: zodResolver(forgetPasswordSchema)
    })

  async function handleForgetPassword(values: ForgetPasswordSchemaType) {
    try {
      setIsLoading(true);
      const response = await ForgetPasswordAction(values.email);
      
      toast.success(response.message || "Reset code sent to your email", {
        position: "top-center",
        duration: 3000,
        icon: <i className="fa-solid fa-circle-check text-green-500"></i>
      });
      
      setIsLoading(false);
      
      // Redirect to verify code page after successful code sending
      router.push('/verifyCode');
    } catch (error: unknown) {
      toast.error((error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Something went wrong", {
        position: "top-center",
        duration: 3000,
        icon: <i className="fa-solid fa-circle-xmark text-red-500"></i>
      });
      setIsLoading(false);
    }
  }

    return (
        <div className='mx-auto px-5 md:px-0 w-full md:w-1/2 my-12'>
            <h1 className='text-3xl text-center font-bold mb-10'>Forget Password</h1>
            <Form {...form}>
                <form className='space-y-3' onSubmit={form.handleSubmit(handleForgetPassword)}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Your Email" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button className='w-full bg-green-500 hover:bg-green-600 cursor-pointer' type="submit">
                        {isLoading ? <Loader2Icon className="animate-spin" /> : "Send Reset Code"}
                    </Button>
                </form>
            </Form>

            <div className="mt-6 text-center">
                <p className="text-gray-600">
                    Remember your password?{' '}
                    <Link
                        href={"/signin"}
                        className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default ForgetPassword