import Image from 'next/image'
import React from 'react'
import notFoundImage from "./../../public/Assets/screens/404.png"

const NotFound = () => {
  return (
    <div className='w-full md:w-[80%] mx-auto p-10'>
      <Image alt='not found image' src={notFoundImage}/>
    </div>
  )
}

export default NotFound
