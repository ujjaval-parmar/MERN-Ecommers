import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import { toast } from 'react-toastify';
import { apiGanerator } from '../helper/apiGanerator';
import AdminProductCard from '../components/AdminProductCard';

const AllProductsPage = () => {

  const [openUploadProduct, setOpenUploadProduct] = useState(false);

  const [allProducts, setAllProducts] = useState([]);

  

  const getProducts = async () => {
    try {
      const response = await apiGanerator('getProducts', "GET", false);

      const responseData = await response.json();



      if (!responseData.success) {
        throw new Error(responseData.error || responseData.message);
      }

      // console.log(responseData);

      setAllProducts(responseData.data || []);




    } catch (err) {
      toast.error(err.message);

    }
  }


  useEffect(() => {


    getProducts();

  }, []);


  


  return (
    <div>

      <div className="bg-white py-2 px-4 flex items-center justify-between">

        <h2 className='font-bold text-lg'>All Products</h2>


        <button className='border border-red-600 text-red-600 py- px-3 hover:bg-red-600 rounded-full hover:text-white transition-all duration-200' onClick={() => setOpenUploadProduct(true)}>Upload Product</button>

      </div>




      <div className='grid  grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center justify-center  gap-5 py-4   mx-auto h-[calc(100vh-190px)] overflow-auto'>
        {allProducts.length > 0 && allProducts.map(product => {
          return (
            <AdminProductCard product={product} key={product._id} getProducts={getProducts} />

          )
        })}
      </div>



      {openUploadProduct && <UploadProduct
        onClose={() => setOpenUploadProduct(false)}
        getProducts={getProducts}
        

      />}

     

    </div>
  )
}

export default AllProductsPage