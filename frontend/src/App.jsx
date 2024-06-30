import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';

import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import Context from './context/context';
import { apiGanerator } from './helper/apiGanerator';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from './store/userSlice';


const App = () => {

  const dispatch = useDispatch();

  const {user} = useSelector(state=> state.user); 

  const [cartCount, setCartCount] = useState(0);


  

  const getUserCartProductCount = async () => {

    try {

      const response = await apiGanerator('countCartProduct', "GET", true);

      const responseData = await response.json();

      if (!responseData.success) {
        throw new Error(response.error || responseData.message);
      }

      // console.log(responseData);
      setCartCount(responseData.data);

      // console.log('IN');


    } catch (err) {
      toast.error(err.message);
    }


  }

  
  useEffect(()=>{
    getUserCartProductCount();

  }, [user, cartCount]);




  // console.log(cartCount);





  return (
    <Context.Provider value={{
      
      cartCount,
      getUserCartProductCount
    }}>
      <ToastContainer
      position="top-center"
      newestOnTop={true}
      className='mt-10'
      />

      <Header  />

      <main className='min-h-[calc(100vh-120px)] pt-20'>
        <Outlet />
      </main>

      <Footer />

    </Context.Provider>

  )
}

export default App