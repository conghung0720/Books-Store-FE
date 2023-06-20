import React from "react";
import LogoHome from "../../img/logo.png";

const Footer = () => {
  return (
    <footer className="bg-footer h-[300px] mt-[2%] px-[5%]">
      <div className="w-full h-[70%] flex justify-center">
        <div className="flex items-center">
          <img src={LogoHome} className="h-[42px] w-[200px] bg-white" />
        </div>
        <ul className="w-[15%] ml-[10%] h-[70%] m-auto text-slate-200 montserrat">
          <li className="text-[23px]">Dịch Vụ</li>
          <li>Điều Khoản</li>
          <li>Chính Sách</li>
          <li>Giới Thiệu BLHH</li>
          <li>Hệ Thống Trung Tâm</li>
        </ul>
        <ul className="w-[15%] h-[70%] m-auto text-slate-200 montserrat">
          <li className="text-[23px]">Dịch Vụ</li>
          <li>Điều Khoản</li>
          <li>Chính Sách</li>
          <li>Giới Thiệu BLHH</li>
          <li>Hệ Thống Trung Tâm</li>
        </ul>
        <ul className="w-[15%] h-[70%] m-auto items-center  text-slate-200 montserrat">
          <li className="text-[23px]">Dịch Vụ</li>
          <li>Điều Khoản</li>
          <li>Chính Sách</li>
          <li>Giới Thiệu BLHH</li>
          <li>Hệ Thống Trung Tâm</li>
        </ul>
        <div className="w-[20%]"></div>
      </div>
      <div className="w-[60%] m-auto montserrat h-[20%] text-white">
        <span>
          Giấy chứng nhận Đăng ký Kinh doanh số 920382181 do Sở Kế hoạch và Đầu
          tư Thành phố cấp ngày 20/12/2003, đăng ký thay đổi lần thứ 16, ngày
          20/05/2022.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
