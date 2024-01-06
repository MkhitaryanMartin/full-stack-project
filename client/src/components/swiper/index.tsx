import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './style.css';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import { CardMedia } from '@mui/material';

type Props ={
    imgList: string[];
    pagination?: Record<string, boolean> | boolean
}

export default function Slider({
    imgList,
    pagination={}
}:Props) {
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        navigation={true}
        pagination={pagination}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        {
            imgList.map((img)=>{
                return <SwiperSlide key={img}>
                  <CardMedia
               component="img"
               height="194"
               image={img}
               alt="Paella dish"
             />
              </SwiperSlide>
             
            })
        }
      </Swiper>
    </>
  );
}
