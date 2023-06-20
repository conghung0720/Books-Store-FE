import React from "react";
import AdsHome from "../../../img/ads_home.jpg";
import ButtonHome from "../../../components/Button/ButtonHome";

const AdsBanner = () => {
  return (
    <div className="h-[548px] flex justify-between">
      <div className="h-[50%] w-[30%] m-auto">
        <h1 className="montserrat text-[40px] title-home-ads font-black">
          Sách Bán Chạy
        </h1>
        <p className="text-[17px]">
          Giảm giá 20% khi mua đơn hàng trên 300.000đ khi mua toàn bộ sách bán
          chạy từ ngày 5/6/2023 (Khuyến mãi áp dụng trên toán bộ BLHH trên toàn
          quốc).
        </p>
        <ButtonHome className="bt-home-banner px-11 mt-5 py-3">
          Mua Ngay
        </ButtonHome>
      </div>
      <div className="w-[60%] relative">
        <img src={AdsHome} className="right-0 top-10 flex absolute w-[600px]" />
      </div>
    </div>
  );
};

export default AdsBanner;
