import React from 'react';
import { Swiper} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';
import { Pagination } from 'swiper/modules';

type Props = {
    children?: React.ReactNode
}

export default function Slider({children}: Props) {
  return (
    <>
      <Swiper
        slidesPerView={6}
        spaceBetween={1}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          '@0.00': {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          '@0.40': {
            slidesPerView: 1,
            
          },
          '@0.50': {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          '@0.60': {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          '@0.72': {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          '@0.76': {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          '@0.95': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '@1.50': {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="productSwiper"
      >
   {children}
      </Swiper>
    </>
  );
}