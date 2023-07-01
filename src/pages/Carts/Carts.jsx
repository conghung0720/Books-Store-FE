import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Headers from "../../components/Header/Headers";
import { useGetListCartQuery } from "../../api/api";
import ItemsCart from "./ItemsCart/ItemsCart";
import api from "../../utils/jwtInterceptor";
import { Link } from "react-router-dom";
import BookCart from "../../img/BookCart.jpg";

const Carts = (props) => {
  const idCart = JSON.parse(localStorage.getItem("idCart"));
  const { data: cartData, isSuccess: cartSuccess } =
    useGetListCartQuery(idCart);
  const [cartItems, setCartItems] = useState([]);
  const [itemsBooks, setItemBooks] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemQuantities, setItemQuantities] = useState({});
  const [fullPrice, setFullPrice] = useState(0);

  const deleteItemsCart = async (itemId) => {
    api
      .delete(`http://localhost:8080/carts/${idCart}/items/${itemId}`)
      .then((response) => {
        console.log(response.data);
        setFullPrice(response.data.fullPrice);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubtract = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === itemId) {
        const updatedQuantity = item.quantity - 1;
        if (updatedQuantity <= 0) {
          deleteItemsCart(item._id);
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
    deleteItemsCart(itemId);
    setCartItems(updatedCartItems);
  };

  const handleAdd = async (itemId) => {
    try {
      const apiURL = `http://localhost:8080/book/${itemId}`;
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

    const apiURL = `http://localhost:8080/carts/${idCart}`;
    api
      .post(apiURL, ...cartItems)
      .then((response) => {
        console.log(
          "Danh sách cartItems đã được cập nhật trên máy chủ:",
          response.data
        );
        setFullPrice(response.data.fullPrice);
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
      <main className="flex bg-cart p-[3%] h-screen">
        <div className="w-[60%] py-[1%] space-y-5">
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
            <p>Không có đơn hàng trong giỏ hàng</p>
          )}
        </div>
        <div className="w-[40%] rounded-xl p-3 shadow-2xl">
          <div>
            <img
              src={BookCart}
              className="w-[100%] h-[300px] object-cover rounded-lg"
            />
          </div>
          <div className=" h-[30%] mt-[5%] flex">
            <div className=" w-[50%]">
              <ul className="space-y-1">
                <li>Tiền sản phẩm</li>
                <li>Phí ship</li>
                <li>Tổng tiền</li>
              </ul>
            </div>
            <div className=" w-[50%] ">
              <ul className="absolute right-[5%]">
                <li>{fullPrice?.toFixed(3)} VNĐ</li>
                <li>32.000 VNĐ</li>
                <li>{(fullPrice + 32)?.toFixed(3)} VNĐ</li>
              </ul>
            </div>
          </div>
          <Link to="/onestepcheckout">
            <button className=" w-full h-[10%] mt-3 rounded-2xl bg-rose-600">
              Thanh Toán
            </button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default Carts;
