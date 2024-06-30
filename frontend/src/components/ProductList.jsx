import React, { useContext, useEffect, useState } from 'react'
import { apiGanerator } from '../helper/apiGanerator';
import { toast } from 'react-toastify';
import fetchCategoryWiseProducts from '../helper/fetchCategoryWiseProducts';


import displayINRCurrency from '../helper/displayCurrency';
import { NavLink } from 'react-router-dom';
import addToCart from '../helper/addToCart';
import Context from '../context/context';

const ProductList = ({ products, loading, loadingNumber }) => {

    // console.log(category)

    const { getUserCartProductCount } = useContext(Context);

    const loadingArrNumber = new Array(loadingNumber || 6).fill(null);



    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);

        getUserCartProductCount();
    }

    // console.log('categoryProducts: ', categoryProducts)

    return (
        <div className='container  mx-auto px-4 my-6   '>

            <div
                className='grid grid-cols-[repeat(auto-fit,minmax(250px,280px))] gap-4 justify-center lg:justify-between '>

                {loading ? (loadingArrNumber.map((item, index) => {
                    return (
                        <div
                            key={index}

                            className="w-full group bg-white rounded-sm shadow  ">

                            <div className='bg-slate-200
                            min-w-[280px] h-48  p-4 flex items-center justify-center  animate-pulse'>

                            </div>

                            <div className='p-4  overflow-hidden'>

                                <h2 className='font-semibold text-base md:text-lg truncate p-1 bg-slate-300 animate-pulse'></h2>

                                <p className='capitalize my-1 p-1 bg-slate-300 animate-pulse'></p>

                                <div className='flex items-center justify-between gap-2 md:gap-4 my-3 w-full'>
                                    <p className='text-red-600 font-semibold p-1 bg-slate-300 w-full animate-pulse'></p>
                                    <p className='text-gray-400 line-through p-1 bg-slate-300 w-full animate-pulse'></p>
                                </div>

                                <div className='w-full text-center'>
                                    <button className=' text-white px-3 py-1 rounded-full w-[90%]  bg-slate-300 animate-pulse'></button>
                                </div>

                            </div>

                        </div>
                    )
                })) :
                    (products.length > 0 && products.map(product => {
                        return (
                            <div
                                key={product._id}

                                className="w-full group bg-white rounded-sm shadow  ">

                                <NavLink to={`/product-detail/${product._id}`}>

                                    <div className='bg-slate-200
                            min-w-[280px] h-48  p-4 flex items-center justify-center'>
                                        <img
                                            src={product?.productImage[0]}
                                            alt={product?.productName}
                                            className=' h-full object-scale-down group-hover:scale-110 mix-blend-multiply'
                                        />
                                    </div>

                                    <div className='p-4  overflow-hidden'>

                                        <h2 className='font-semibold text-base md:text-lg truncate'>{product?.productName}</h2>

                                        <p className='capitalize my-1 '>{product?.category}</p>

                                        <div className='flex items-center justify-between gap-2 md:gap-4 my-3'>
                                            <p className='text-red-600 font-semibold'>{displayINRCurrency(product?.sellingPrice)}</p>
                                            <p className='text-gray-400 line-through'>{displayINRCurrency(product?.price)}</p>
                                        </div>

                                        <div className='w-full text-center'>
                                            <button className='bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full w-[90%]' onClick={(e) => {
                                                handleAddToCart(e, product._id);

                                            }}>Add To Cart</button>
                                        </div>

                                    </div>

                                </NavLink>

                            </div>
                        )
                    }))}

            </div>

        </div >
    )
}

export default ProductList