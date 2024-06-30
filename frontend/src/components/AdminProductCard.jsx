import React, { useState } from 'react'
import { MdModeEditOutline } from 'react-icons/md'
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helper/displayCurrency';
import { NavLink } from 'react-router-dom';





const AdminProductCard = ({ product, getProducts }) => {

    const [openEditProduct, setOpenEditProduct] = useState(false);


    return (
        <div key={product._id} className=' bg-white p-4 rounded '>

            <NavLink to={'/product-detail/' + product._id} className='w-full h-full'>

                <img src={product.productImage[0]} alt="" width={120} height={120} className='w-32 h-32 mx-auto object-contain' />
                <h2 className='my-2 text-ellipsis line-clamp-2'>{product.productName}</h2>

                <div className='flex items-center '>


                    <p className='font-semibold'>{displayINRCurrency(product.sellingPrice)}</p>

                    <div className='w-fit ml-auto p-2 bg-green-400 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setOpenEditProduct(true);
                    }}>
                        <MdModeEditOutline />
                    </div>


                </div>




            </NavLink>

            {openEditProduct && <AdminEditProduct product={product}
                onClose={() => setOpenEditProduct(false)}
                getProducts={getProducts}

            />}



        </div>
    )
}

export default AdminProductCard