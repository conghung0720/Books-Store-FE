// CartContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/jwtInterceptor";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./features/profileSlice";
import { useGetListCartQuery } from "../api/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { data, isSuccess: isSuccessCart } = useGetListCartQuery(
    JSON.parse(localStorage.getItem("idCart"))
  );

  const [cartItems, setCartItems] = useState(data?.items || []);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDataProfile, setIsDataProfile] = useState();
  const dispatch = useDispatch();
  const items = useSelector((state) => state);
  const [numberItems, setNumberItems] = useState(1);

  useEffect(() => {
    setNumberItems(1);
  }, []);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedItems = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };
  const idCart = useSelector((state) => state.profile);

  useEffect(() => {
    const idCart = JSON.parse(localStorage.getItem("idCart"));
    const apiURL = `http://localhost:8000/carts/${idCart}`;
    isSuccessCart &&
      api
        .post(apiURL, ...cartItems)
        .then((response) => {
          console.log("Item đã được thêm vào API:", response.data);
        })
        .catch((error) => {
          console.error("Lỗi khi thêm item vào API:", error);
        });
  }, [cartItems, isSuccessCart]);

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
