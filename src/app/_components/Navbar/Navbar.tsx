"use client"

import Link from 'next/link'
import React, { useContext, useState, useEffect } from 'react'
import logoImg from "./../../../../public/Assets/screens/freshcart-logo.svg"
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { cartContext } from '@/context/CartContext'
import { Badge } from '@/components/ui/badge'
import { wishlistContext } from '@/context/WishlistContext'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const { status } = useSession();
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);

  const { numOfCartItems } = useContext(cartContext) as {
    numOfCartItems: number;
  };
  const { numOfWishlistItems } = useContext(wishlistContext) as {
    numOfWishlistItems: number;
  };

  const handleWindowResize = () => {
    if (window.innerWidth >= 768) {
      setOpenNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  // Helper function to check if a link is active
  const isActive = (path: string): boolean => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  // Helper function to get link classes
  const getLinkClasses = (path: string): string => {
    const baseClasses = "px-3 py-2 rounded-md transition-all duration-200 font-medium";
    const activeClasses = "text-green-600";
    const inactiveClasses = "text-gray-700 hover:text-green-600";

    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  // NavList component for mobile and desktop
  const NavList = () => {
    if (status !== "authenticated") return null;

    return (
      <ul className="flex flex-col md:flex-row items-center gap-6">
        <li>
          <Link href={"/"} className={getLinkClasses("/")}>
            Home
          </Link>
        </li>
        <li>
          <Link href={"/brands"} className={getLinkClasses("/brands")}>
            Brands
          </Link>
        </li>
        <li>
          <Link href={"/allorders"} className={getLinkClasses("/allorders")}>
            Orders
          </Link>
        </li>
      </ul>
    );
  };

  return (
    <div className='bg-slate-100 py-5 sticky top-0 z-50 shadow-sm'>
      <div className='w-full md:w-[80%] mx-auto px-4'>
        <div className="flex items-center justify-between">
          {/* Logo and Navigation - Left Side */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              {status === "authenticated" && (
                <Link href={"/"}>
                  <Image src={logoImg} alt='logo icon' className="hover:scale-105 transition-transform duration-200" />
                </Link>
              )}
              {status === "unauthenticated" && <Image src={logoImg} alt='logo icon' />}
              {status === "loading" && <h1>Loading...</h1>}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <NavList />
            </div>
          </div>

          {/* Desktop Right Side - Cart, Wishlist, Sign Out */}
          {status === "authenticated" && (
            <div className="hidden md:flex gap-4 items-center">
              <div className='relative'>
                <Link href={"/wishlist"} className="relative p-2 rounded-md group flex items-center justify-center">
                  <i className={`fas fa-heart text-xl transition-colors duration-200 ${isActive("/wishlist") ? "text-green-600" : "text-gray-700 group-hover:text-green-600"}`}></i>
                  {numOfWishlistItems > 0 ? (
                    <Badge className="w-1 h-4 text-[10px] absolute -top-1 -right-1 bg-green-500">
                      {numOfWishlistItems}
                    </Badge>
                  ) : null}
                </Link>
              </div>
              
              <div className='relative'>
                <Link href={"/cart"} className="relative p-2 rounded-md group flex items-center justify-center">
                  <i className={`fas fa-shopping-cart text-xl transition-colors duration-200 ${isActive("/cart") ? "text-green-600" : "text-gray-700 group-hover:text-green-600"}`}></i>
                  {numOfCartItems > 0 ? (
                    <Badge className="w-1 h-4 text-[10px] absolute -top-1 -right-1 bg-green-500">
                      {numOfCartItems}
                    </Badge>
                  ) : null}
                </Link>
              </div>

              <button
                className='px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-all duration-200 font-medium cursor-pointer'
                onClick={() => signOut({
                  callbackUrl: "/signin"
                })}
              >
                Sign Out
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-200 transition-colors"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <i className="fas fa-times text-xl text-gray-700"></i>
            ) : (
              <i className="fas fa-bars text-xl text-gray-700"></i>
            )}
          </button>
        </div>

        {/* Mobile Collapsible Menu */}
        {openNav && (
          <div className="md:hidden mt-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-4">
              {/* Mobile Navigation Links */}
              <NavList />
              
              {/* Mobile Right Side - Cart, Wishlist, Sign Out */}
              {status === "authenticated" && (
                <div className="flex justify-center gap-6 items-center pt-4 border-t border-gray-200">
                  <div className='relative'>
                    <Link href={"/wishlist"} className="relative p-2 rounded-md group flex items-center justify-center">
                      <i className={`fas fa-heart text-xl transition-colors duration-200 ${isActive("/wishlist") ? "text-green-600" : "text-gray-700 group-hover:text-green-600"}`}></i>
                      {numOfWishlistItems > 0 ? (
                        <Badge className="w-1 h-4 text-[10px] absolute -top-1 -right-1 bg-green-500">
                          {numOfWishlistItems}
                        </Badge>
                      ) : null}
                    </Link>
                  </div>
                  
                  <div className='relative'>
                    <Link href={"/cart"} className="relative p-2 rounded-md group flex items-center justify-center">
                      <i className={`fas fa-shopping-cart text-xl transition-colors duration-200 ${isActive("/cart") ? "text-green-600" : "text-gray-700 group-hover:text-green-600"}`}></i>
                      {numOfCartItems > 0 ? (
                        <Badge className="w-1 h-4 text-[10px] absolute -top-1 -right-1 bg-green-500">
                          {numOfCartItems}
                        </Badge>
                      ) : null}
                    </Link>
                  </div>

                  <button
                    className='px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-all duration-200 font-medium cursor-pointer'
                    onClick={() => signOut({
                      callbackUrl: "/signin"
                    })}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
