import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Scrollbar } from "swiper";

export default function SlidesPerView(props) {
  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={-50}
        navigation={true}
        // scrollbar={true}
        grabCursor={true}
        modules={[Pagination, Scrollbar, Navigation]}
        className="mySwiper"
      >
        {props.children}
      </Swiper>
    </>
  );
}
