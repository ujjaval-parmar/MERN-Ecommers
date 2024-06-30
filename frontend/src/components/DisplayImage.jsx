import React from 'react'
import { CgClose } from 'react-icons/cg'

const DisplayImage = ({ imageUrl, onClose }) => {
    return (
        <div className='absolute inset-0 w-full h-full flex items-center justify-center'>

            <div className='bg-white shadow-lg rounded max-w-5xl mx-auto p-4'>

                <div onClick={onClose} className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer'>
                    <CgClose />
                </div>

                <div className='flex justify-center p-5 max-w-[80vw] max-h-[80vh] '>
                    <img src={imageUrl} alt="" className='w-full h-full object-cover' />
                </div>
            </div>

        </div>

    )
}

export default DisplayImage