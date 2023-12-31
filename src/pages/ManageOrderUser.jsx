import React, { useEffect, useState } from "react";
import {
  MenuIcon,
  SearchIcon,
  DocumentDownloadIcon,
} from "@heroicons/react/24/solid";
import { useGetListManageOrderQuery } from "../api/api";
import { convertDate } from "../utils/convertDate";
import { Link } from "react-router-dom";
import api from "../utils/jwtInterceptor";
import ExportExcel from "./Staff/ManageOrder/ExportExcel";

const OrderStatus = (status) => {
  let colorClass = "";
  let text = "";
  console.log(status);
  switch (status) {
    case "Đã nhận":
      colorClass = "bg-blue-500";
      text = "Đã nhận";
      break;
    case "Đang giao hàng":
      colorClass = "bg-green-500";
      text = "Đang giao hàng";
      break;
    case "Đang xử lý":
      colorClass = "bg-yellow-500";
      text = "Đang xử lý";
      break;
    case "Chấp nhận":
      colorClass = "bg-orange-500";
      text = "Chấp nhận";
      break;
    case "Đã hủy":
      colorClass = "bg-red-500";
      text = "Đã hủy";
      break;
    default:
      colorClass = "bg-gray-500";
      text = "Unknown";
      break;
  }

  return (
    <div
      className={`${colorClass} text-white text-[16px] py-1 px-2 rounded-lg inline-block`}
    >
      {text}
    </div>
  );
};

function OrderDetails() {
  const [activeTab, setActiveTab] = useState("Đã nhận");
  const [isDataOrder, setIsDataOrder] = useState([]);
  const [dataExports, setDataExports] = useState([]);
  const { data: dataOrder, isSuccess } = useGetListManageOrderQuery();

  const handleStatusAPI = async (status, id) => {
    return await api.get(`orders-detail/${status}/${id}`).then((res) => {
      const updateNewStatus = isDataOrder.map((value) => {
        if (value._id === res.data._id) return res.data;
        else return value;
      });
      setIsDataOrder(updateNewStatus);
    });
  };

  const handleDelivery = async (id) => {
    handleStatusAPI("delivery", id);
  };

  const handleCancel = async (id) => {
    handleStatusAPI("cancel", id);
  };

  const handleAccept = async (id) => {
    handleStatusAPI("accept", id);
  };

  useEffect(() => {
    setIsDataOrder(dataOrder);
    const dataUpdate = dataOrder
      ?.map((value) => {
        if (value.status === "Đã nhận") {
          return {
            "Ngày nhận": convertDate(value.updateAt),
            "Tổng giá": value.fullPrice.toFixed(3),
          };
        } else return;
      })
      .filter((value) => value !== undefined);

    setDataExports(dataUpdate);
  }, [dataOrder]);
  console.log(dataExports);
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between px-4 py-2 bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          {/* <MenuIcon className="w-6 h-6 text-gray-600" /> */}
          <span className="text-xl font-bold text-gray-800">Dashboard</span>
        </div>
        <div className="flex items-center space-x-2">
          {/* <SearchIcon className="w-6 h-6 text-gray-600" /> */}
          <input
            type="text"
            placeholder="Search invoice"
            className="w-40 border-b border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <ExportExcel data={dataExports} />
        </div>
      </div>
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
        <div className="mt-4 flex items-center space-x-4">
          <button
            onClick={() => setActiveTab("Tất cả")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "Tất cả"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setActiveTab("Đã nhận")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "Đã nhận"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Hoàn Thành
          </button>
          <button
            onClick={() => setActiveTab("Đang giao hàng")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "Đang giao hàng"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Đang Giao Hàng
          </button>
          <button
            onClick={() => setActiveTab("Chấp nhận")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "Chấp nhận"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Chấp nhận
          </button>
          <button
            onClick={() => setActiveTab("Đang xử lý")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "Đang xử lý"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Đang xử lý
          </button>
          <button
            onClick={() => setActiveTab("Đã hủy")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "Đã hủy"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Đã Hủy
          </button>
        </div>
        <table className="mt-4 w-full bg-white shadow-sm rounded-md">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Order ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Tên khách
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Sản phẩm
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Ngày đặt
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Tổng giá
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Trạng thái
              </th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {isSuccess &&
              isDataOrder?.length > 0 &&
              [...isDataOrder]
                .filter((order) => {
                  if (activeTab === "Tất cả") return order;
                  if (activeTab === order.status) return order;
                })
                .map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-gray-300 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">
                      {order._id}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">
                      {order.fullName}
                    </td>
                    <Link to={`/history-orders/${order._id}`}>
                      <td className="px-4 py-3 text-sm font-medium text-blue-600 cursor-pointer">
                        Chi tiết
                      </td>
                    </Link>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">
                      {convertDate(order.createAt)}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">
                      {order.fullPrice?.toFixed(3)} VND
                    </td>
                    <td>{OrderStatus(order?.status)}</td>
                    <td className="px-4 py-3 flex items-center justify-end">
                      {order?.status === "Đang xử lý" && (
                        <>
                          <button
                            onClick={() => handleAccept(order._id)}
                            className="px-2 py-1 mr-3 bg-gray-200 rounded-md text-gray-600 hover:bg-gray-300"
                          >
                            Chấp nhận
                          </button>

                          <button
                            onClick={() => handleCancel(order._id)}
                            className="px-2 py-1 bg-rose-600 rounded-md text-white hover:bg-rose-500"
                          >
                            Hủy
                          </button>
                        </>
                      )}
                      {order?.status === "Chấp nhận" && (
                        <>
                          <button
                            onClick={() => handleDelivery(order._id)}
                            className="px-2 py-1 mr-3 bg-yellow-200 rounded-md text-gray-600 hover:bg-yellow-300"
                          >
                            Giao hàng
                          </button>
                          <button
                            onClick={() => handleCancel(order._id)}
                            className="px-2 py-1 bg-rose-600 rounded-md text-white hover:bg-rose-500"
                          >
                            Hủy
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        <div className="mt-4 flex items-center justify-between space-x-4">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
            Previous
          </button>
          <span className="text-sm font-medium text-gray-800">
            Page 1 of 10
          </span>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
