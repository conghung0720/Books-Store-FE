import React from "react";
import { useParams } from "react-router-dom";
import { useGetOrderDetailsByIdQuery } from "../../api/api";
import { convertDate } from "../../utils/convertDate";
import api from "../../utils/jwtInterceptor";

function IdHistoryOrders() {
  const { id } = useParams();
  const { data: orderDetails, isSuccess } = useGetOrderDetailsByIdQuery(id);

  const handleSuccessClick = async (orderId) => {
    await api.get(`http://localhost:8080/orders-detail/success/${orderId}`);
  };

  return (
    isSuccess && (
      <div className="bg-gray-100 min-h-screen px-[10%]">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-4">
            Chi tiết đơn hàng #{orderDetails._id}
          </h1>
          {
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  Thông tin đơn hàng
                </h2>
                <p className="text-gray-600 mb-2">
                  Ngày đặt hàng: {convertDate(orderDetails.createAt)}
                </p>
                <p className="text-gray-600 mb-2">
                  Trạng thái: {orderDetails.status}
                </p>
                <p className="text-gray-600">Địa chỉ: {orderDetails.address}</p>
                <p className="text-gray-600">
                  Số điện thoại {orderDetails.phone}
                </p>
              </div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Danh sách sách</h2>
                <div className="grid grid-cols-2 gap-4">
                  {isSuccess &&
                    orderDetails?.items.map((item) => {
                      if (item.quantity === null) {
                        return null;
                      }
                      return (
                        <div
                          key={item._id}
                          className="bg-gray-200 p-4 rounded-lg flex items-center"
                        >
                          <img
                            src={item.images?.at(0)}
                            alt={item.title}
                            className="w-16 h-16 mr-4"
                          />
                          <div>
                            <h3 className="text-lg font-semibold">
                              {item.title}
                            </h3>
                            <p className="text-gray-600">
                              Giá: {item.price?.toFixed(3)}VND
                            </p>
                            <p className="text-gray-600">
                              Số lượng: {item.quantity}
                            </p>
                            <p className="text-gray-600">ID: {item._id}</p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Tổng tiền</h2>
                <p className="text-gray-600">
                  Tổng tiền: {orderDetails.fullPrice?.toFixed(2)} VND
                </p>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => handleSuccessClick(orderDetails._id)}
                  className="bg-rose-600 hover:bg-rose-500 text-white py-2 px-4 rounded"
                >
                  Đã nhận
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    )
  );
}

export default IdHistoryOrders;
