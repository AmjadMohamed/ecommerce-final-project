import React from 'react'
import { Spinner } from '@/components/ui/shadcn-io/spinner';

const Loading = () => {
    return (
        <div className='h-screen w-full flex justify-center items-center'>
            <Spinner className='text-green-500' size={75} />
        </div>
    )
}

export default Loading
