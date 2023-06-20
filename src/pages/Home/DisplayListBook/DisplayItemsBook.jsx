import React, { useState } from "react";
import SlidesPerView from "../../../components/Carousel/SlidesPerView";
import { SwiperSlide } from "swiper/react";
import { data } from "../FlashSale";
import ButtonHome from "../../../components/Button/ButtonHome";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import sliceString from "../../../utils/sliceString";

const DisplayItemsBook = (props) => {
  return (
    <div className="">
      {props.children}
      <SlidesPerView>
        {props.data?.map((value, index) => {
          return (
            <SwiperSlide>
              <Link to={`details/${value._id}`}>
                <div className="shadow-xl p-3 mb-[50px] bg-white w-[200px] h-[400px] m-auto">
                  <div className="rounded-[50%] bg-yellow-600 w-[20%] text-center h-[10%] text-[14px] items-center flex justify-center ml-[80%]">
                    {value.flashSale?.salePrice * 100 || "0"}%
                  </div>
                  <img src={value.images} className="h-[190px]" />
                  <h1 className="montserrat font-bold text-[20px] mb-1">
                    {value.price.toFixed(3)}đ
                  </h1>
                  <div className="h-[20%]">
                    <h1 className="font-medium text-[14px]">
                      {sliceString({ text: value.title, endText: 20 })}
                    </h1>
                    <h5 className="">{value.author}</h5>
                  </div>
                  <div className="flex">
                    <ButtonHome className="bt-home-banner px-5 mt-2 py-1 rounded-[3px]">
                      Mua Ngay
                    </ButtonHome>
                    <HeartIcon className="h-5 w-5 m-auto" />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </SlidesPerView>
    </div>
  );
};

export default DisplayItemsBook;
