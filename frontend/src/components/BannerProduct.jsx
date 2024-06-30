import React, { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles

import 'swiper/css/navigation';

import { Navigation, Autoplay } from 'swiper/modules';


const desktopImages = [
    'img1.webp',
    'img2.webp',
    'img3.jpg',
    'img4.jpg',
    'img5.webp',
];

const mobileImages = [
    'img1_mobile.jpg',
    'img2_mobile.webp',
    'img3_mobile.jpg',
    'img4_mobile.jpg',
    'img5_mobile.png',
]

const BannerProduct = () => {

    const [windowWidth, setWindowWidth] = useState(window.screen.availWidth);



    useEffect(() => {

        const handleWindowChange = e => {
            // console.log(window);
            setWindowWidth(window.screen.availWidth);
        }

        window.addEventListener('resize', handleWindowChange);

        return () => window.removeEventListener('resize', handleWindowChange);

    }, [window.screen.availWidth]);


    // console.log(windowWidth)

    return (
        <div className='container mx-auto px-4 my-6'>

            <Swiper
                navigation={true}
                modules={[Navigation, Autoplay]}
                loop={true}
                autoplay={{
                    delay: 3000,
                }}
                className="mySwiper h-72 w-full bg-slate-200  rounded overflow-hidden ">

                {
                    desktopImages.map((image, index) => {
                        return (
                            <SwiperSlide className='w-full h-full' key={index}>
                                <img
                                    src={windowWidth > 800 ? `/banner/${desktopImages[index]}` : `/banner/${mobileImages[index]}`}
                                    // src="/banner/img1_mobile.jpg"
                                    alt=""
                                    className={`w-full h-full  ${windowWidth > 800 ? 'object-cover' : 'object-fill h-full'}`} />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>


        </div >
    )
}

export default BannerProduct


//     < div className = 'h-72 w-full bg-slate-200 px-4 rounded overflow-hidden ' >

//     {
//         desktopImages.map((image, index) => {
//             return (
//                 <div className='w-full h-full' key={index}>
//                     <img
//                         src={windowWidth > 500 ? `/banner/${desktopImages[index]}` : `/banner/${mobileImages[index]}`}
//                         // src="/banner/img1_mobile.jpg"
//                         alt=""
//                         className={`w-full  ${windowWidth > 500 ? 'object-cover' : 'object-fill h-full'}`} />
//                 </div>
//             )
//         })
//     }




// </ >