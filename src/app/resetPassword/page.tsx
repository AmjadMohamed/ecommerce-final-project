"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { resetPasswordSchema, ResetPasswordSchemaType } from '@/schema/ResetPassword.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Loader2Icon } from 'lucide-react'
import Link from 'next/link'
import { ResetPasswordAction } from '@/apis/AuthActions/resetPassword'

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  
  const form = useForm<ResetPasswordSchemaType>({
    defaultValues: {
      email: "",
      newPassword: "",
    },
    resolver: zodResolver(resetPasswordSchema)
  })

  async function handleResetPassword(values: ResetPasswordSchemaType) {
    try {
      setIsLoading(true);
      const response = await ResetPasswordAction(values.email, values.newPassword);
      
      toast.success(response.message || "Password reset successfully", {
        position: "top-center",
        duration: 3000,
        icon: <i className="fa-solid fa-circle-check text-green-500"></i>
      });
      
      setIsLoading(false);
      
      // Redirect to signin page after successful password reset
      router.push('/signin');
    } catch (error: unknown) {
      toast.error((error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to reset password", {
        position: "top-center",
        duration: 3000,
        icon: <i className="fa-solid fa-circle-xmark text-red-500"></i>
      });
      setIsLoading(false);
    }
  }

  return (
    <div className='mx-auto px-5 md:px-0 w-full md:w-1/2 my-12'>
      <h1 className='text-3xl text-center font-bold mb-10'>Reset Password</h1>
      <p className='text-center text-gray-600 mb-8'>
        Enter your email and new password to reset your account password.
      </p>
      
      <Form {...form}>
        <form className='space-y-3' onSubmit={form.handleSubmit(handleResetPassword)}>
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

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter New Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button className='w-full bg-green-500 hover:bg-green-600 cursor-pointer' type="submit">
            {isLoading ? <Loader2Icon className="animate-spin" /> : "Reset Password"}
          </Button>
        </form>
      </Form>
      
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Remember your password?{' '}
          <Link 
            href="/signin" 
            className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ResetPassword