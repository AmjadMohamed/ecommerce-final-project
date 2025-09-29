"use client"
import React, { useEffect } from 'react'

// Error components must accept and use the error and reset props
const Error = ({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) => {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className='flex flex-col justify-center items-center gap-4 h-screen'>
            <h2 className='text-red-600 text-4xl'>Something went wrong!</h2>
            <p className='text-gray-600 mb-4'>{error.message || 'An unexpected error occurred'}</p>
            <button
                onClick={() => reset()}
                className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors'
            >
                Try again
            </button>
        </div>
    )
}

export default Error
