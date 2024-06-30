import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import { apiGanerator } from '../helper/apiGanerator';
import ProductList from '../components/ProductList';
import { useNavigate } from 'react-router-dom';

const SearchProductPage = () => {


  const [searchProducts, setSearchProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  

  const location = useLocation();

  const navigate = useNavigate();




  const getSearchProducts = async (searchQuery, controller) => {

    try {
      setLoading(true);
      const response = await fetch(`/api/getSearchProducts?searchQuery=${searchQuery?.toLowerCase()}`, {
        signal: controller.signal
      });


      const responseData = await response.json();
      // console.log('INRes: ', responseData);


      setSearchProducts(responseData.data);

      // location.search = '';





    } catch (err) {
      if (err.message === 'signal is aborted without reason') return;
      console.log(err);
      toast.error(err.message);
    }finally{
      setLoading(false);
    }


  }

  useEffect(() => {

    // console.log('navigate : ', navigate)


  }, []);


  useEffect(() => {

    const controller = new AbortController();

    const urlParams = new URLSearchParams(location.search);
    const searchQuery = urlParams.get('query');

    setSearchText(searchQuery);
    // console.log(searchQuery)
    if (searchQuery?.length > 1) {

      getSearchProducts(searchQuery, controller);


    } else {
      setSearchProducts(null)
    }

    return () => {
      controller.abort();

    }

  }, [location.search]);


  return (
    <div>

      {searchProducts?.length === 0 && searchText?.length > 2 && (
        <p className='py-4 w-full bg-white text-lg text-center'>No Products Found!</p>
      )}

      {searchText?.length < 2 && (
        <p className='py-4 w-full bg-white text-lg text-center'>Please Search with more than 2 characters</p>
      )}

      {searchProducts?.length > 0 && (
        <div className='container mx-auto flex flex-col items-start'>
          <h2 className='px-4 text-xl font-medium'>Search Results: {searchProducts.length}</h2>
          <ProductList products={searchProducts} loading={loading} loadingNumber={5}/>
        </div>
      )}
    </div>
  )
}

export default SearchProductPage