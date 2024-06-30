import React, { useCallback, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { apiGanerator } from '../helper/apiGanerator';
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { FaStarHalf } from 'react-icons/fa6';
import displayINRCurrency from '../helper/displayCurrency';
import VerticleCardProduct from '../components/VerticleCardProduct';
import addToCart from '../helper/addToCart';

import Context from '../context/context';
import SuggestedProducts from '../components/SuggestedProducts';


const ProductDetail = () => {

  const { productId } = useParams();

  const { getUserCartProductCount } = useContext(Context);

  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState('');

  const [zoomImgCoord, setZoomImgCoord] = useState({
    x: 0,
    y: 0
  });

  const productLoading = new Array(4).fill(null);

  const getProductDetail = async () => {

    try {

      const response = await apiGanerator('getProductDetail/' + productId, "GET", false);

      const responseData = await response.json();

      // console.log(responseData);
      setActiveImage(responseData?.data?.productImage[0]);
      setProductData(responseData?.data);

    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }

  }

  // console.log(productData)

  const handleZoomImage = useCallback((e) => {
    // console.log(e);

    // const zoomHoverTimer = setInterval(() => {

    const { left, top, width, height } = e.target.getBoundingClientRect();

    // console.log(left, top, width, height);


    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomImgCoord({ x, y });



    // })
  }, [zoomImgCoord]);



  // console.log(zoomImgCoord);

  // Zoom UseEffect:

  useEffect(() => {
    setLoading(true);
    getProductDetail();
    setLoading(false);

    if (productData) {
      // window.scrollTo(0, 0);
      window.scrollTo({ top: 0, behavior: 'smooth' });

    }


  }, [productId]);


  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);

    getUserCartProductCount();
  }



  // console.log(productData);

  const handleMouseEnterProduct = (imgUrl) => {
    setActiveImage(imgUrl);
  }

  return (
    <div className='container mx-auto p-4 min-h-[calc(100vh-120px)]'>


      {productData &&

        <div className='h-fit  flex flex-col lg:flex-row gap-8 md:gap-4 items-center'>


          {/* Product Image */}
          <div className=' flex flex-col lg:items-center lg:flex-row-reverse gap-4 '>

            {loading ? (
              <div className='h-[300px] w-[300px] mx-auto lg:h-96 lg:w-96 bg-gray-300 animate-pulse'>

              </div>
            ) : (
              <div className='h-[300px] w-[300px] mx-auto lg:h-96 lg:w-96 bg-gray-200 relative group p-2'>
                <img src={activeImage} alt="product" className='h-full w-full object-scale-down mix-blend-multiply ' onMouseMove={handleZoomImage} />

                {/* Product Zoom */}
                <div className='hidden  lg:group-hover:block absolute  min-w-[400px] min-h-[400px] bg-slate-200 p-1 -right-[410px] top-0 overflow-hidden ml-2'>
                  <div className='min-w-[400px] min-h-[400px] mix-blend-multiply scale-110'
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPositionX: `${zoomImgCoord.x * 100}%`,
                      backgroundPositionY: `${zoomImgCoord.y * 100}%`,
                    }}
                  >

                  </div>
                </div>


              </div>
            )}

            <div className='h-full'>

              <div>
                {loading ?

                  (<div className='flex lg:flex-col  gap-3 animate-pulse overflow-auto scrollbar-none h-full'>
                    {productLoading.map((item, index) => {
                      return (
                        <div className='h-20 w-20 bg-slate-200 rounded ' key={index}>

                        </div>
                      )
                    })}
                  </div>)
                  :
                  (
                    (<div className='flex lg:flex-col gap-4    overflow-auto scrollbar-none h-full '>


                      {productData.productImage.map((imgUrl, index) => {
                        if (imgUrl) {
                          return (

                            <div className='h-20 w-20 bg-slate-200 rounded ' key={index}>
                              <img src={imgUrl} alt="product" className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={() => handleMouseEnterProduct(imgUrl)} onClick={() => handleMouseEnterProduct(imgUrl)} />
                            </div>)
                        }

                      })}

                    </div>)
                  )
                }
              </div>

            </div>


          </div>


          {/* Product Detailes */}
          {loading ? (
            <div className='flex flex-col gap-3'>

              <p className='bg-red-300 text-red-700 px-4 py-1 w-fit rounded-full animate-pulse'></p>

              <h2 className='text-2xl lg:text-4xl font-medium p-1 bg-slate-300 md:w-[50%] animate-pulse'></h2>

              <p className='text-slate-400 text-sm lg:text-md capitalize p-1 bg-slate-300 md:w-[50%] animate-pulse'></p>

              <div className='text-red-200 flex gap-1 text-lg animate-pulse'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
              </div>

              <div className='flex  gap-2 md:gap-4 text-xl  md:text-3xl '>
                <p className='text-red-600 font-semibold p-1 bg-slate-300 md:w-[50%] animate-pulse'></p>

              </div>


              <div className='flex items-center gap-3'>
                <button className='min-w-[100px] px-3 py-1  transition-all rounded bg-slate-300 animate-pulse'></button>
                <button className='min-w-[100px] px-3 py-1  text-white transition-all rounded bg-slate-300 animate-pulse'></button>
              </div>

              <div className='max-w-xl '>
                <p className='text-gray-500 font-medium pt-2 md:pt-4'>Description:</p>
                <p className="bg-slate-300 animate-pulse p-1"></p>
              </div>


            </div>
          ) : (
            <div className='flex flex-col gap-3 w-full'>

              <p className='bg-red-200 text-red-700 px-4 py-1 w-fit rounded-full'>{productData?.brandName}</p>

              <h2 className='text-2xl lg:text-4xl font-medium'>{productData.productName}</h2>

              <p className='text-slate-400 text-sm lg:text-md capitalize'>{productData.category}</p>

              <div className='text-red-600 flex gap-1 text-lg'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
              </div>

              <div className='flex  gap-2 md:gap-4 text-xl  md:text-3xl '>
                <p className='text-red-600 font-semibold'>{displayINRCurrency(productData?.sellingPrice)}</p>
                <p className='text-gray-400 line-through text-lg  md:text-2xl self-end'>{displayINRCurrency(productData?.price)}</p>
              </div>


              <div className='flex items-center gap-3'>
                <button className='min-w-[100px] px-3 py-1 bg-white border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all rounded'>Buy</button>
                <button className='min-w-[100px] px-3 py-1 hover:bg-white border-2 hover:border-red-600 hover:text-red-600 bg-red-600 text-white transition-all rounded' onClick={(e) => handleAddToCart(e, productData._id)}>Add To Cart</button>
              </div>

              <div className='max-w-xl'>
                <p className='text-gray-500 font-medium pt-2 md:pt-4'>Description:</p>
                <p className="">{productData.description}</p>
              </div>


            </div>
          )}



        </div>}

      {/* {console.log(productData?.category)} */}

      {
        productData?.category && <SuggestedProducts activeProductId={productData._id} category={productData?.category} heading='Suggested Products' />
      }


    </div>
  )
}

export default ProductDetail