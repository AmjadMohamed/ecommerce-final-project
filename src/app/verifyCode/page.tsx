"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { verifyCodeSchema, VerifyCodeSchemaType } from '@/schema/VerifyCode.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Loader2Icon } from 'lucide-react'
import Link from 'next/link'
import { VerifyResetPasswordAction } from '@/apis/AuthActions/verifyResetPassword'

const VerifyCodePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  
  const form = useForm<VerifyCodeSchemaType>({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(verifyCodeSchema)
  })

  async function handleVerifyCode(values: VerifyCodeSchemaType) {
    try {
      setIsLoading(true);
      const response = await VerifyResetPasswordAction(values.resetCode);
      
      toast.success(response.message || "Code verified successfully", {
        position: "top-center",
        duration: 3000,
        icon: <i className="fa-solid fa-circle-check text-green-500"></i>
      });
      
      setIsLoading(false);
      
      // Redirect to reset password page after successful verification
      router.push('/resetPassword');
    } catch (error: unknown) {
      toast.error((error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Invalid reset code", {
        position: "top-center",
        duration: 3000,
        icon: <i className="fa-solid fa-circle-xmark text-red-500"></i>
      });
      setIsLoading(false);
    }
  }

  return (
    <div className='mx-auto px-5 md:px-0 w-full md:w-1/2 my-12'>
      <h1 className='text-3xl text-center font-bold mb-10'>Verify Reset Code</h1>
      <p className='text-center text-gray-600 mb-8'>
        Please enter the reset code that was sent to your email address.
      </p>
      
      <Form {...form}>
        <form className='space-y-3' onSubmit={form.handleSubmit(handleVerifyCode)}>
          <FormField
            control={form.control}
            name="resetCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reset Code</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter the reset code" 
                    type="text" 
                    {...field} 
                    className="text-center text-lg tracking-widest"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button className='w-full bg-green-500 hover:bg-green-600 cursor-pointer' type="submit">
            {isLoading ? <Loader2Icon className="animate-spin" /> : "Verify Code"}
          </Button>
        </form>
      </Form>
      
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Didn&apos;t receive the code?{' '}
          <Link 
            href="/forgetPassword" 
            className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
          >
            Resend code
          </Link>
        </p>
      </div>
    </div>
  )
}

export default VerifyCodePage