import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Headers from "../../components/Header/Headers";
import { useGetListCartQuery } from "../../api/api";
import ItemsCart from "./ItemsCart/ItemsCart";
import api from "../../utils/jwtInterceptor";

const Carts = (props) => {
  const idCart = JSON.parse(localStorage.getItem("idCart"));
  const { data: cartData, isSuccess: cartSuccess } =
    useGetListCartQuery(idCart);
  const [cartItems, setCartItems] = useState([]);
  const [itemsBooks, setItemBooks] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemQuantities, setItemQuantities] = useState({});

  const handleSubtract = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === itemId) {
        const updatedQuantity = item.quantity - 1;
        if (updatedQuantity <= 0) {
          return null;
        }
        return {
          ...item,
          quantity: updatedQuantity,
        };
      }
      return item;
    });

    const filteredCartItems = updatedCartItems.filter((item) => item !== null);
    setCartItems(filteredCartItems);
  };

  const handleDelete = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updatedCartItems);
  };
  const handleAdd = async (itemId) => {
    try {
      const apiURL = `http://localhost:8000/book/${itemId}`;
      const response = await api.get(apiURL);
      const fetchedItem = response.data;
      setSelectedItem(fetchedItem);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin item từ máy chủ:", error);
    }

    const updatedCartItems = cartItems.map((item) => {
      if (item._id === itemId) {
        const updatedQuantity = item.quantity + 1;
        if (selectedItem && updatedQuantity > selectedItem.quantity) {
          // Nếu plus lớn hơn quantity của item, không thay đổi quantity
          return item;
        }
        return {
          ...item,
          quantity: updatedQuantity,
        };
      }
      return item;
    });

    setCartItems(updatedCartItems);
  };

  useEffect(() => {
    if (cartSuccess && cartData?.items) {
      const filteredItems = cartData.items.filter((item) => item._id);
      setCartItems(filteredItems);

      const quantities = {};
      filteredItems.forEach((item) => {
        quantities[item._id] = item.quantity;
      });
      setItemQuantities(quantities);
    }
  }, [cartSuccess, cartData]);

  const updateCartItems = () => {
    const idCart = JSON.parse(localStorage.getItem("idCart"));
    console.log(cartItems);

    const apiURL = `http://localhost:8000/carts/${idCart}`;
    api
      .post(apiURL, ...cartItems)
      .then((response) => {
        console.log(
          "Danh sách cartItems đã được cập nhật trên máy chủ:",
          response.data
        );
      })
      .catch((error) => {
        console.error(
          "Lỗi khi cập nhật danh sách cartItems trên máy chủ:",
          error
        );
      });
  };

  useEffect(() => {
    updateCartItems();
  }, [cartItems]);

  return (
    <>
      <Headers />
      <main className="flex p-[3%] h-screen">
        <div className="border-red-600 border-2 w-[60%] py-[1%]">
          {cartSuccess && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <ItemsCart
                key={item._id}
                _id={item._id}
                image={item.images[0]}
                title={item.title}
                price={+item.price * +item.quantity}
                value={item.quantity}
                onSubtract={handleSubtract}
                onAdd={handleAdd}
                onDelete={handleDelete}
                selectedItem={selectedItem}
              />
            ))
          ) : (
            <p>No items in cart</p>
          )}
        </div>
        <div className="border-red-600 border-2 w-[40%]">s</div>
      </main>
    </>
  );
};

export default Carts;
