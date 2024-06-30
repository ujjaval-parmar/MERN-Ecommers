import React, { useEffect, useState } from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticleCardProduct from '../components/VerticleCardProduct'


const HomePage = () => {

  


  return (
    <div>

      <CategoryList />

      <BannerProduct />

      <HorizontalCardProduct category='airpodes' />

      <HorizontalCardProduct category='camera' />

      <VerticleCardProduct category='mobiles' />

      <VerticleCardProduct category='speakers' />

      <VerticleCardProduct category='refrigerator' />

      {/* <div className="w-full bg-red-600">TEST</div> */}



    </div>
  )
}

export default HomePage