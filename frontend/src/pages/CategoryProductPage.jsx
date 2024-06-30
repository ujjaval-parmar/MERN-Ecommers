import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { apiGanerator } from '../helper/apiGanerator';
import ProductList from '../components/ProductList';
import productCategory from '../helper/productCategory';

const CategoryProductPage = () => {

  const { categoryName } = useParams();

  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkboxArr, setCheckboxArr] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState([categoryName || '']);

  const [sortBy, setSortBy] = useState({
    sort: ''
  });


  // console.log(categoryName)

  const getCategoryProducts = async () => {

    try {
      setLoading(true)
      const response = await apiGanerator('getAllProducts', 'POST', true, {
        selectedCategory,
        sortBy
      });

      const responseData = await response.json();

      // console.log(responseData);

      setCategoryProducts(responseData.data)




    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }


  }

  useEffect(() => {
    getCategoryProducts();
  }, [selectedCategory, sortBy])

  const handleCheckboxChnage = e => {
    // console.log('in')
    // e.stopPropagation();
    // e.preventDefault();
    // console.dir(e.target.checked);

    if (e.target.checked) {
      setSelectedCategory([...selectedCategory, e.target.name]);
    } else {
      setSelectedCategory(selectedCategory.filter((category) => category !== e.target.name)
      )
    }


  }

  const handleSortChange = e => {
    console.log(e.target.id, e.target.checked);
    setSortBy({ sort: e.target.id });
  }

  // console.log(selectedCategory);
  // console.log(categoryProducts);
  // console.log(sortBy);

  return (
    <div className='container mx-auto p-4'>


      {/* Desktop version */}
      <div className='grid grid-cols-1  relative '>
        {/* {left Side} */}
        <div className='bg-white p-4 my-6 h-fit md:min-h-[calc(100vh-140px)] w-full md:w-52 md:fixed   mx-auto' >

          <div className=''>
            <h3 className='text-md uppercase font-medium text-slate-500 border-b-2 border-slate-300 pb-1'>Sort by</h3>

            <div>

              <div className=''>
                <input type="radio" name="sort" id='lowToHigh' onChange={handleSortChange} />
                <label className='pl-4 tracking-wide inline-block py-1' htmlFor='lowToHigh'>Price- Low to High</label>
              </div>

              <div className=''>
                <input type="radio" name="sort" id='highToLow' onChange={handleSortChange} />
                <label className='pl-4 tracking-wide inline-block py-1' htmlFor='highToLow'>Price- High to Low</label>
              </div>

            </div>

          </div>

          <div>


            <h3 className='text-md uppercase font-medium text-slate-500 border-b-2 border-slate-300 pb-1'>Category</h3>

            <div className='flex flex-col gap-1 pt-2'>

              {productCategory.map(category => {

                return (

                  <div key={category.value} className=''>
                    <input type="checkbox" id={category.value} name={category.value} onChange={handleCheckboxChnage} checked={selectedCategory?.includes(category?.value)} />
                    <label htmlFor={category.value} className="ml-2">{category.label} </label>
                  </div>


                )
              })}

            </div>

          </div>


        </div>


        {/* Right Side */}
        <div className=' ml-0 md:ml-56 max-w-full o'>

              <p className='ml-4 mt-5 px-4 bg-white w-fit text-lg font-medium tracking-wide'>Total Products: {categoryProducts.length} </p>

          {categoryProducts?.length > 0 && (
            <ProductList products={categoryProducts} loading={loading} loadingNumber={5} />
          )}
        </div>


      </div>




    </div>
  )
}

export default CategoryProductPage