import React, { useState } from 'react'

import { CgClose } from 'react-icons/cg';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import productCategory from '../helper/productCategory';
import imageToBase64 from '../helper/imageTobase64';
import uploadImage from '../helper/uploadImage';
import DisplayImage from './DisplayImage';
import { toast } from 'react-toastify';
import { apiGanerator } from '../helper/apiGanerator';

const UploadProduct = ({ onClose, getProducts }) => {



    const [data, setData] = useState({
        productName: '',
        brandName: '',
        category: '',
        productImage: [],
        description: '',
        price: '',
        sellingPrice: '',
    });

    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState('');

    const handleChange = e => {
        setData({ ...data, [e.target.id]: e.target.value });
    }

    const handleUploadImage = async (e) => {


        const file = e.target.files[0];

        // console.log(files);

        const uploadImageCloudinary = await uploadImage(file);

        const cloudinaryResponseData = await uploadImageCloudinary.json()

        // console.log(cloudinaryResponseData)

        setData({ ...data, productImage: [...data.productImage, cloudinaryResponseData.url] });

    }

    const handleDeleteProductImage = async (index) => {
        // console.log(index)

        const newProductImage = [...data.productImage];
        newProductImage.splice(index, 1);
        setData({ ...data, productImage: [...newProductImage] });

    }

    const handleUploadProduct = async(e)=>{

        e.preventDefault();


        try{

            const response = await apiGanerator('uploadProduct', "POST", true, data);

            const responseData = await response.json();

            // console.log(responseData);

            if(response.status == '500'){
                throw new Error('All Fields Required');
            }


            if(!responseData.success){
                throw new Error(responseData.error || responseData.message);
            }


            toast.success('Product Uploaded Succesfully!');

            
            getProducts();
            
            onClose();


        }catch(err){
            toast.error(err.message);
        }
    }

    // console.log(data);
    // console.log(uploadProductImageInput);

    return (
        <div className='absolute w-full h-full inset-0 bg-slate-200/70 flex items-center  justify-center '>

            <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%]  overflow-hidden">

                <div className='flex items-center justify-between'>
                    <h2 className='font-bold text-lg text-center'>Upload Product</h2>

                    <div className='w-fit text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <CgClose />
                    </div>

                </div>

                <form className='p-4 pb-4  grid gap-1 overflow-auto h-full' onSubmit={handleUploadProduct}>


                    <label htmlFor='productName'>Product Name:</label>
                    <input
                        type="text"
                        id='productName'
                        placeholder='Enter Product Name'
                        className='p-2 bg-slate-100 border rounded-xl'
                        value={data.productName}
                        onChange={handleChange}
                    />

                    <label htmlFor='brandName'>Brand Name:</label>
                    <input
                        type="text"
                        id='brandName'
                        placeholder='Enter Brand Name'
                        className='p-2 bg-slate-100 border rounded-xl'
                        value={data.brandName}
                        onChange={handleChange}
                    />

                    <label htmlFor='category'>Category :</label>
                    <select
                        name="category"
                        id="category"
                        className='p-2 bg-slate-100 border rounded-xl'
                        value={data.category}
                        onChange={handleChange}
                    >
                        <option value="" >Select Category</option>
                        {productCategory.map(category => {
                            return (
                                <option value={category.value} key={category.id}>{category.label}</option>
                            )
                        })}
                    </select>

                    <label htmlFor='productImage' className='cursor-pointer'>Upload Product Image :

                        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex items-center justify-center'>


                            <div className='text-slate-500 flex flex-col items-center justify-center gap-2'>

                                <span className='text-3xl '>
                                    <FaCloudUploadAlt />
                                </span>
                                <p className='text-sm'>Upload Product Image</p>
                                <input
                                    type="file"
                                    id="productImage"
                                    className='hidden'
                                    onChange={handleUploadImage}
                                    multiple
                                />
                            </div>

                        </div>
                    </label>

                    {data.productImage.length > 0 ? <div className='flex items-center flex-wrap gap-2' >
                        {data.productImage.map((image, index) => {
                            return (
                                <div key={index} className='relative group'>
                                    <img src={image} alt="" width={100} height={100} className='bg-slate-100 border object-cover cursor-pointer'
                                        onClick={() => {
                                            setFullScreenImage(image);
                                            setOpenFullScreenImage(true);
                                        }}
                                    />

                                    <div className='invisible group-hover:visible absolute bottom-0 right-0 p-1 text-white bg-red-600 hover:bg-red-700 rounded-full cursor-pointer' onClick={(e) => handleDeleteProductImage(index)}>
                                        <MdDelete />
                                    </div>


                                </div>
                            )
                        })}
                    </div>
                        : <p className='text-red-600 text-center'>* Please Upload Product Image</p>

                    }

                    <label htmlFor='price'>Price :</label>
                    <input
                        type="number"
                        id='price'
                        placeholder='Enter Price'
                        className='p-2 bg-slate-100 border rounded-xl'
                        value={data.price}
                        onChange={handleChange}
                    />

                    <label htmlFor='sellingPrice'>Selling Price :</label>
                    <input
                        type="number"
                        id='sellingPrice'
                        placeholder='Enter Selling Price'
                        className='p-2 bg-slate-100 border rounded-xl'
                        value={data.sellingPrice}
                        onChange={handleChange}
                    />

                    <label htmlFor='description'>description :</label>

                    <textarea  
                    id="description"
                    placeholder='Enter Product Description'
                    value={data.description}
                    onChange={handleChange}
                    className='p-2 w-full min-h-28 overflow-auto border bg-gray-100 border-gray-300 rounded-md'
                    />


                    <button className='px-3 py-2 bg-red-600 text-white mt-3 mb-4 hover:bg-red-700'>Upload Product</button>



                </form>

            </div >

            {openFullScreenImage && <DisplayImage
                onClose={() => setOpenFullScreenImage(false)}
                imageUrl={fullScreenImage}
            />}

        </div >
    )
}

export default UploadProduct