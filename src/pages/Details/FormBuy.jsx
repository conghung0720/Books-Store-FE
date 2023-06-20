import React, { useEffect, useState } from "react";
import RatingStar from "../../utils/ratingStar";
import InputQuantity from "../../components/Input/InputQuantity";
import ButtonMediumWeight from "../../components/Button/ButtonMediumWeight";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../../store/features/cartSlice";
import { store } from "../../store/store";
import { addValue } from "../../store/features/countValueInput";
import { useCart } from "../../store/CartProvider";

const FormBuy = ({ data }) => {
  const dispatch = useDispatch();
  const [isItems, setIsItems] = useState([]);
  const valueItemToCart = useSelector((state) => state.countValue.valueItem);
  const { addToCart } = useCart();

  const addItemToCart = () => {
    if (valueItemToCart > data.quantity) {
      alert("");
    }
    dispatch(addItems({ Test: "test" }));
    addToCart(data);

    // const changeQuantityItemExist = isItems?.filter((value) => {
    //   if (value._id === data._id) {
    //     value.quantity += valueItemToCart;
    //     return {
    //       quantity: +value.quantity,
    //       ...value,
    //     };
    //   }
    // });

    // if (changeQuantityItemExist.length > 0) setIsItems(changeQuantityItemExist);
    // else setIsItems([...isItems, { ...data, quantity: +valueItemToCart }]);
  };

  return (
    <div className="p-3 flex border-2  h-[500px] w-[80%] rounded-lg m-auto mt-[2%]">
      {[data]?.map((value) => {
        return (
          <>
            <div className="w-[30%] flex items-center">
              <img src={value.images} className="h-[80%] " />
            </div>
            <div className="w-[65%] h-[70%] m-auto ">
              <h1 className="font-semibold text-[24px] font-thins">
                {value.title}
              </h1>
              <div className="flex justify-between w-[90%] text-[14px] mt-[2%]">
                <div className="w-[50%]">
                  <div className="flex">
                    <span className="mr-2">Nhà cung cấp:</span>
                    <h4 className="font-medium">{value.publisher}</h4>
                  </div>
                  <div className="flex">
                    <span className="mr-2">Nhà xuất bản:</span>
                    <h4 className="font-medium">{value.supplier}</h4>
                  </div>
                </div>
                <div className="w-[50%]">
                  <div className="flex">
                    <span className="mr-2">Tác giả:</span>
                    <h4 className="font-medium">{value.author}</h4>
                  </div>
                </div>
              </div>
              <div className="flex mt-[1%] text-center items-center">
                <RatingStar rating={4} />
                <span className="text-yellow-500 ml-3">
                  ({value.numRating} đánh giá)
                </span>
              </div>
              <h1 className="text-red-600 font-bold text-[30px] mt-3">
                {value.price.toFixed(3)} đ
              </h1>
              <div className="flex items-center mt-4">
                <h1 className="mr-[4%] text-medium text-[17px] font-semibold">
                  Số lượng:{" "}
                </h1>
                <InputQuantity quantity={value.quantity} />
              </div>
              <div className="flex space-x-6">
                <ButtonMediumWeight className="bg-rose-600 text-white mt-[6%]">
                  Mua ngay
                </ButtonMediumWeight>
                <ButtonMediumWeight
                  onClick={addItemToCart}
                  className=" text-rose-600 mt-[6%] flex"
                >
                  <ShoppingCartIcon className="h-5 w-5 mr-4" />
                  Thêm vào giỏ hàng
                </ButtonMediumWeight>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default FormBuy;
