import React, { useState } from "react";
import { useGetListManageOrderQuery, useGetProfileQuery } from "../../api/api";
import { convertDate } from "../../utils/convertDate";
import api from "../../utils/jwtInterceptor";
import { useNavigate } from "react-router-dom";

const ManageOrder = () => {
  const { data, isSuccess } = useGetListManageOrderQuery();
  const idUser = JSON.parse(localStorage.getItem("idUser"));
  const [isStatus, setStatus] = useState("");
  const navigate = useNavigate();
  const { data: roles, isSuccess: isSuccess2 } = useGetProfileQuery(idUser);

  const handleCancelOrder = async (orderId) => {
    await api
      .get(`http://localhost:8080/orders-detail/cancel/${orderId}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setStatus("Đã hủy");
  };

  const handleApproveOrder = async (orderId) => {
    await api
      .get(`http://localhost:8080/orders-detail/accept/${orderId}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setStatus("Chấp nhận");
  };

  const handleViewCustomerInfo = (userId) => {
    navigate(`/user/${userId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Đã hủy":
        return "text-red-600";
      case "Đang xử lý":
        return "text-green-600";
      case "Chấp nhận":
        return "text-blue-600";
      default:
        return "text-blue-600";
    }
  };

  return (
    <div>
      {isSuccess &&
        [...data].reverse().map((order) => (
          <div
            key={order.id}
            className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-4"
          >
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2 text-blue-600">
                {/* #{order._id} */}
              </h2>
              <p className="text-gray-600 mb-4">
                Ngày đặt: {convertDate(order.createAt)}
              </p>
              <p className="text-gray-600 mb-4">
                Trạng thái:{" "}
                <span className={getStatusColor(isStatus || order.status)}>
                  {isStatus || order.status}
                </span>
              </p>
              <div className="flex justify-end mb-4">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
                  onClick={() => handleViewCustomerInfo(order.idUser)}
                >
                  Xem thông tin khách hàng
                </button>
                {order.status === "Đang xử lý" && (
                  <>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mr-2"
                      onClick={() => handleCancelOrder(order._id)}
                    >
                      Hủy
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                      onClick={() => handleApproveOrder(order._id)}
                    >
                      Đồng ý
                    </button>
                  </>
                )}
                {order.status === "Chấp nhận" && (
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mr-2"
                    onClick={() => handleCancelOrder(order._id)}
                  >
                    Hủy
                  </button>
                )}
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold mb-2">Thông tin sản phẩm</h3>
                {order.items.map((item) => {
                  if (!item.quantity) return null;
                  return (
                    <div key={item.id} className="flex items-center mb-4">
                      <img
                        src={item.images}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                      <div>
                        <h4 className="text-xl font-bold mb-2 text-gray-800">
                          {item.name}
                        </h4>
                        <p className="text-gray-600 mb-2">
                          Số lượng: {item.quantity}
                        </p>
                        <p className="text-gray-600 mb-2">
                          Giá: {item.price?.toFixed(3)} VND
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold mb-2">
                  Thông tin khách hàng
                </h3>
                <p className="text-gray-600 mb-2">Tên: {order.fullName}</p>
                <p className="text-gray-600 mb-2">Email: {order.email}</p>
                <p className="text-gray-600 mb-2">
                  Điện thoại: {order.customerPhone}
                </p>
                <p className="text-gray-600 mb-2">Địa chỉ: {order.address}</p>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold mb-2">Tổng giá</h3>
                <p className="text-gray-600">
                  {order.fullPrice?.toFixed(3)} VNĐ
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ManageOrder;
