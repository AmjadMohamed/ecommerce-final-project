"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signInSchema, SignInSchemaType } from '@/schema/SignIn.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { signIn } from "next-auth/react"
import { Loader2Icon } from 'lucide-react'
import Link from 'next/link'

const SignIn = () => {

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const form = useForm<SignInSchemaType>(
    {
      defaultValues: {
        email: "",
        password: "",
      },
      resolver: zodResolver(signInSchema)
    }
  )

  async function handleSignIn(values: SignInSchemaType) {
    // try {
    //   const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values);

    //   toast.success(data.message, {
    //     position: "top-center",
    //     duration: 3000,
    //     icon: <i className="fa-solid fa-circle-check text-green-500"></i>
    //   });

    //   router.push("/");
    // }
    // catch (error) {
    //   toast.error(error.response.data.message, {
    //     position: "top-center",
    //     duration: 3000,
    //     icon: <i className="fa-solid fa-circle-xmark text-red-500"></i>
    //   });
    // }

    setIsLoading(true);

    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/"
    });

    if (res?.ok) {
      toast.success("Successfully Signed In", {
        position: "top-center",
        duration: 3000,
        icon: <i className="fa-solid fa-circle-check text-green-500"></i>
      });

      setIsLoading(false);

      window.location.href = res.url || "/";

    }
    else {
      toast.error(res?.error, {
        position: "top-center",
        duration: 3000,
        icon: <i className="fa-solid fa-circle-xmark text-red-500"></i>
      });
      setIsLoading(false);
    }
  }


  return (
    <div className='mx-auto px-5 md:px-0 w-full md:w-1/2 my-12 '>
      <h1 className='text-3xl text-center font-bold mb-10'>Sign In Form</h1>
      <Form {...form}>
        <form className='space-y-3' onSubmit={form.handleSubmit(handleSignIn)}>

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
          
          <div className="text-right">
            <Link 
              href="/forgetPassword" 
              className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200 text-sm"
            >
              Forget Password?
            </Link>
          </div>

          <Button className='w-full bg-green-500 hover:bg-green-600 cursor-pointer'>{isLoading ? <Loader2Icon className="animate-spin" /> : "Sign In"}</Button>
        </form>
      </Form>
      
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link 
            href="/signup" 
            className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn
