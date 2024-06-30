import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { apiGanerator } from '../helper/apiGanerator';
import { NavLink } from 'react-router-dom';

const CategoryList = () => {

    const [categoryProducts, setCategoryProducts] = useState([]);

    const [loading, setLoading] = useState(false);


    const numberLoading = new Array(13).fill(null);


    const getCategoryProducts = async () => {
        try {

            setLoading(true);

            const response = await apiGanerator('getCategoryProduct', "GET", false);

            const responseData = await response.json();


            if (!responseData.success) {
                throw new Error(responseData.error || responseData.message);
            }

            // console.log(responseData);

            setCategoryProducts(responseData.data || []);


        } catch (err) {
            toast.error(err.message);

        } finally {
            setLoading(false);
        }
    }



    useEffect(() => {

        getCategoryProducts();


    }, []);

    // console.log(categoryProducts);


    return (
        <div className='container mx-auto p-4'>

            <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>


                {loading ? (

                    numberLoading.map((el, index) => {
                        return (<div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={index}>
                            
                        </div>)
                    })

                ) :

                    (categoryProducts.length > 0 && categoryProducts.map(product => {
                        return (
                            <NavLink to={'/product-category/' + product?.category} key={product?._id} className='cursor-pointer group'>

                                <div className='w-16 h-16 md:w-20 md:h-20 rounded-full p-4 bg-slate-200 flex items-center justify-center '>
                                    <img src={product?.productImage[0]} alt={product?.category}
                                        className="h-full object-scale-down mix-blend-multiply group-hover:scale-125 transition-all" />
                                </div>

                                <p className='capitalize text-center text-sm md:text-base'>{product?.category}</p>

                            </NavLink>
                        )
                    }))}
            </div>

        </div>
    )
}

export default CategoryList