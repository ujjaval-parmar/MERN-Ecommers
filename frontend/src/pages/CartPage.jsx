import React, { useContext, useEffect, useState } from 'react'
import Context from '../context/context';
import { toast } from 'react-toastify';
import { apiGanerator } from '../helper/apiGanerator';
import displayINRCurrency from '../helper/displayCurrency';
import addToCart from '../helper/addToCart';
import descreseCartProduct from '../helper/descreseCartProduct';
import { MdDelete } from "react-icons/md";
import deleteCartProduct from '../helper/deleteCartProduct';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const CartPage = () => {

    const navigate = useNavigate();

    const { user } = useSelector(state => state.user);

    const { cartCount, getUserCartProductCount } = useContext(Context);

    const [cartProducts, setCartProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isCartEmpty, setIsCartEmpty] = useState(false);

    let totalPrice = 0;
    let totalQuantity = 0;

    const LoadingNumbers = new Array(cartCount).fill(null);


    useEffect(() => {
        if (!user) {
            navigate('/login');
        }

    }, [user])

    const getCartProducts = async () => {

        try {
            setIsCartEmpty(false);
            const response = await apiGanerator('getCartProducts', "GET", true);

            const cartProductIDs = await response.json();

            // console.log(cartProductIDs);
            if(cartProductIDs.data.length<=0){
                setIsCartEmpty(true);
            }
            setCartProducts(cartProductIDs.data);


        } catch (err) {
            console.log(err.message);
            toast.error(err.message);
        }

    }


    const handleLoading = async() =>{
        await getCartProducts();
    }


    useEffect(() => {

        // console.log('in');
        setLoading(true);
        handleLoading();
        setLoading(false);

    }, [cartCount]);



    const handleDecCartProduct = async (e, id) => {

        await descreseCartProduct(e, id);
        getUserCartProductCount();
        getCartProducts();



    }

    const handleIncCartProduct = async (e, id) => {

        await addToCart(e, id);
        getUserCartProductCount();
        getCartProducts();

    }

    const handleDeleteCartProduct = async (e, id) => {

        await deleteCartProduct(e, id);
        getUserCartProductCount();


    }



    return (
        <div className='container mx-auto min-h-[calc(100vh-140px)]'>



            <div className='flex flex-col lg:flex-row lg:justify-between gap-10 lg:gap-20'>

                {/* View Product */}
                <div className='w-full max-w-3xl '>
                    {loading ?

                        LoadingNumbers.map((el, index) => {
                            return (
                                <div className='w-full bg-slate-400 h-32 my-2 border border-slate-00 animate-pulse rounded' key={index} >

                                </div>
                            )
                        })

                        : (
                            cartProducts?.length > 0 && !loading && cartProducts.map(({ productId: product, quantity }) => {
                                return (<div className='w-full bg-white h-40 my-2 border border-slate-200  rounded mx-1 md:mx-0 flex gap-4 relative' key={product._id}>

                                    <div className='w-24 md:w-32 h-full bg-slate-200 p-1'>
                                        <img src={product.productImage[0]} alt={product.productName} className='w-full h-full object-scale-down mix-blend-multiply ' />
                                    </div>

                                    <div className='py-2 w-full h-full flex flex-col gap-2'>

                                        <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1 '>{product.productName}</h2>

                                        <p className='text-md md:text-lg text-slate-500 capitalize'>{product.category}</p>

                                        <div className='flex  gap-2 md:gap-4 text-lg  md:text-xl items-center justify-between pr-4'>
                                            <p className='text-red-600 font-normal'>{displayINRCurrency(product?.sellingPrice)}</p>
                                            <p className='text-gray-900  text-md  md:text-lg self-end font-semibold'>{displayINRCurrency(product.sellingPrice * quantity)}</p>
                                        </div>

                                        <div className="flex items-center gap-3">

                                            <button className='bg-white border-2 border-red-600 hover:bg-red-600 hover:text-white  w-6 h-6 flex items-center justify-center font-bold rounded' onClick={(e) => handleDecCartProduct(e, product._id)}>-</button>


                                            <p>{quantity}</p>

                                            <button className='bg-white border-2 border-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex items-center justify-center font-bold rounded' onClick={(e) => {
                                                handleIncCartProduct(e, product._id);
                                            }}>+</button>


                                        </div>


                                    </div>

                                    <div className='absolute bottom-2 right-2  text-red-600 text-lg md:text-xl cursor-pointer hover:bg-red-600 hover:text-white rounded-full p-1 ' onClick={(e) => {
                                        handleDeleteCartProduct(e, product._id);

                                    }}>
                                        <MdDelete />
                                    </div>


                                </div>
                                )
                            })

                        )}
                </div>

                {/* Cart Total Summary */}

                <div className='mt-5 lg:mt-2 w-full  lg:max-w-sm  '>

                    {
                       cartProducts.length <= 0 && loading ? (
                            <div className='h-36 bg-slate-400 animate-pulse'>

                            </div>
                        ) : (
                            cartProducts?.length > 0 && <div className='h-36 bg-white mb-4 mx-1 w-full flex flex-col gap-3'>

                                <h2 className='bg-red-600 text-white w-full text-center py-2'>Summry</h2>

                                <div className='w-full flex items-center justify-between px-2'>
                                    <p>Quantity</p>
                                    <p> {
                                        cartProducts.map((product => {

                                            totalQuantity = totalQuantity + product.quantity
                                        }))
                                    }
                                        {totalQuantity}</p>
                                </div>

                                <div className='w-full flex items-center justify-between px-2'>
                                    <p>Total Price</p>
                                    <p>{
                                        cartProducts.map((product => {

                                            totalPrice = totalPrice + product.productId.sellingPrice * product.quantity
                                        }))
                                    }
                                        {displayINRCurrency(totalPrice)}</p>
                                </div>

                                <button className='bg-blue-600 text-white w-full text-center py-2'>Payment</button>

                            </div>
                        )
                    }


                </div>




            </div>


            {
                !loading && isCartEmpty &&  (
                    <div className='text-center text-lg my-3'>
                        <p className='bg-white py-5'>Cart is Empty!</p>
                    </div>)
            }


        </div >
    )
}

export default CartPage