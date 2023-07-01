import React, { useEffect, useState } from "react";
import {
  useGetDeleteItemsCartQuery,
  useGetListCartQuery,
  usePostOrderDetailsMutation,
} from "../../api/api";
import Headers from "../../components/Header/Headers";
import CheckOut from "../../img/checkout.png";
import axios from "axios";
import api from "../../utils/jwtInterceptor";
import { useNavigate } from "react-router-dom";

const OneStepCheckOut = () => {
  const getIdCart = JSON.parse(localStorage.getItem("idCart"));
  const getIdUser = JSON.parse(localStorage.getItem("idUser"));

  const [postOrderDetails, { isLoading, isSuccess }] =
    usePostOrderDetailsMutation();
  const { data: listCart } = useGetListCartQuery(getIdCart);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(listCart);
    if (!fullName || !email || !phoneNumber || !address) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    await postOrderDetails({
      idUser: getIdUser,
      idCart: getIdCart,
      items: listCart.items,
      fullName: fullName,
      email: email,
      address: address,
      totalPrice: listCart.totalPrice,
      status: "Đang xử lý",
    });

    api
      .get(`http://localhost:8080/carts/delete/${getIdCart}`)
      .then((response) => {
        console.log("Success");
      })
      .catch((error) => {
        console.error(error);
      });

    navigate("/history-orders");
  };

  return (
    <>
      <Headers />
      <main className="h-screen flex p-8">
        <div className="w-[50%] space-y-4 px-[1%] items-center ">
          <h1 className="text-black text-3xl font-inter font-semibold tracking-wider">
            Thanh Toán
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="">
              <p>Họ Tên</p>
              <input
                placeholder=""
                className="border-2 w-[80%] h-[40px] rounded-lg"
                id="fullName"
                value={fullName}
                onChange={handleFullNameChange}
              />
            </div>

            <div className="">
              <p>Email</p>
              <input
                type="email"
                className="border-2 w-[80%] h-[40px] rounded-lg"
                required
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="">
              <p>Số điện thoại</p>
              <input
                className="border-2 w-[80%] h-[40px] rounded-lg"
                required
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </div>
            <div className="">
              <p>Địa chỉ</p>
              <input
                className="border-2 w-[80%] h-[40px] rounded-lg"
                required
                value={address}
                onChange={handleAddressChange}
              />
            </div>
            <div className=" py-5 h-[30%]">
              <div className="w-[70%] h-auto  flex justify-between mb-3">
                <span>Tổng tiền</span>
                <span>899.444</span>
              </div>
              <button className="bg-rose-600 text-white rounded-lg h-[55px] w-[70%] m-auto">
                Thanh Toán
              </button>
              <div className="w-[10%]"></div>
            </div>
          </form>
        </div>
        <div className=" w-[50%]">
          <img src={CheckOut} className="h-[100%] m-auto" alt="Checkout" />
        </div>
      </main>
    </>
  );
};

export default OneStepCheckOut;
