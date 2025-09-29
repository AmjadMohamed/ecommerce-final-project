"use client"

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signUpSchema, SignUpSchemaType } from '@/schema/SignUp.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import Link from 'next/link'

const SignUp = () => {

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter()
  const form = useForm<SignUpSchemaType>(
    {
      defaultValues: {
        name: "",
        email: "",
        password: "",
        rePassword: "",
        phone: ""
      },
      resolver: zodResolver(signUpSchema)
    }
  )

  async function handleSignUp(values: SignUpSchemaType) {
    setIsLoading(true);
    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);

      toast.success(data.message, {
        position: "top-center",
        duration: 3000,
        icon: <i className="fa-solid fa-circle-check text-green-500"></i>
      });

      setIsLoading(false);
      router.push("/signin");
    }
    catch (error: unknown) {
      toast.error((error as { response?: { data?: { message?: string } } })?.response?.data?.message || "An error occurred", {
        position: "top-center",
        duration: 3000,
        icon: <i className="fa-solid fa-circle-xmark text-red-500"></i>
      });
      setIsLoading(false);
    }
  }


  return (
    <div className='mx-auto px-5 md:px-0 w-full md:w-1/2 my-12 '>
      <h1 className='text-3xl text-center font-bold mb-10'>Sign Up Form</h1>
      <Form {...form}>
        <form className='space-y-3' onSubmit={form.handleSubmit(handleSignUp)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Name" type="text" {...field} />
                </FormControl>
                {/* <FormDescription>This is your public display name.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Phone Number" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="ReEnter Your Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className='w-full bg-green-500 hover:bg-green-600 cursor-pointer'>{isLoading ? <Loader2Icon className="animate-spin" /> : "Sign Up"}</Button>
        </form>
      </Form>
      
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
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

export default SignUp
