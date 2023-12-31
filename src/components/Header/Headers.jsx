import React, { useEffect, useState } from "react";
import {
  BellIcon,
  ShoppingBagIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import {
  MagnifyingGlassIcon,
  HeartIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import LogoBanner from "../../img/logo.png";
import DropdownMenuDemo from "../DropDownMenu/DropDownMenu";
import api from "../../utils/jwtInterceptor";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/features/profileSlice";
import { useCart } from "../../store/CartProvider";
import { useGetAllBooksQuery } from "../../api/api";

const Headers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { data: isData } = useGetAllBooksQuery();
  const [isDataProfile, setIsDataProfile] = useState();
  const dispatch = useDispatch();
  const items = useSelector((state) => state);
  const [numberItems, setNumberItems] = useState(1);
  useEffect(() => {
    api
      .get("http://localhost:8080/auth/profile")
      .then((res) => {
        setIsDataProfile(res.data);
        localStorage.setItem("idCart", JSON.stringify(res.data.cartId));
        localStorage.setItem("idUser", JSON.stringify(res.data._id));
        localStorage.setItem("roles", JSON.stringify(res.data.roles.at(0)));
        dispatch(getUser(res.data));
        setIsSuccess(true);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsSuccess(false);
      });

    setNumberItems(1);
  }, []);

  return (
    <header className="px-[4%] bo justify-between h-[80px] w-full flex">
      <div className="w-[15%] flex justify-center">
        <img src={LogoBanner} className="h-[50px] m-auto" />
      </div>
      <ul className="flex justify-between w-[33%] items-center text-center">
        <Link to="/">
          <li>Trang Chủ</li>
        </Link>
        <Link to="/search">
          <li>Sản Phẩm</li>
        </Link>
        <li>Tác Giả</li>
        <li>Thể Loại</li>
        <li>Liên Hệ</li>
      </ul>
      <div className="flex justify-center w-[20%] h-[50px] text-center items-center mt-2 border-b-slate-500 border-b-2">
        <i>
          <MagnifyingGlassIcon className="h-4 w-4 m-auto" />
        </i>
        <input
          className="h-[40%] ml-3 m-auto focus:outline-none"
          placeholder="Tìm Kiếm"
        />
      </div>
      <ul className="w-[15%] justify-between items-center flex">
        <li>
          <HeartIcon className="h-6 w-6 cursor-pointer" />
        </li>
        <li>
          <Link to="/cart">
            <ShoppingBagIcon className="h-6 w-6 cursor-pointer" />
          </Link>
        </li>
        <span>1 SP</span>
        <li>{<DropdownMenuDemo avatar={isDataProfile?.avatar} />}</li>
      </ul>
    </header>
  );
};

export default Headers;
