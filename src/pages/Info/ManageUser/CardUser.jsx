import React from "react";
import { useParams } from "react-router-dom";
import { useGetListOrderUserQuery, useGetUserIdQuery } from "../../../api/api";

const UserCard = () => {
  const { idUser } = useParams();
  const { data: user, isSuccess } = useGetUserIdQuery(idUser);
  const { data: orderUser, isSuccess: isSuccess2 } =
    useGetListOrderUserQuery(idUser);
  const handleStatusChange = (status) => {};
  return (
    isSuccess && (
      <div className="max-w-[50%] mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          className="w-full h-56 object-cover object-center"
          src={user.avatar}
          alt="Ảnh đại diện"
        />
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">{user.fullName}</h2>
          <p className="text-gray-600 mb-4">{user.userName}</p>
          <p className="text-gray-600 mb-4">
            <span className="font-bold">Email:</span> {user.email}
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-bold">Số điện thoại:</span> {user.phoneNumber}
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-bold">Địa chỉ:</span> {user.address}
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-bold">Giới tính:</span>{" "}
            {user.sex === "male" ? "Nam" : "Nữ"}
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-bold">Vai trò:</span> {user.roles.join(", ")}
          </p>
          <div className="flex justify-between">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Chỉnh sửa
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
              Xóa
            </button>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">Các đơn hàng</h3>
            {isSuccess2 &&
              orderUser?.map((order) => (
                <div key={order.id} className="bg-gray-100 p-4 rounded-md mt-2">
                  <h4 className="text-lg font-bold mb-2">
                    Đơn hàng #{order._id}
                  </h4>
                  <p className="text-gray-600 mb-2">
                    Ngày đặt: {order.createAt}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Trạng thái: {order.status}
                  </p>
                  <div className="flex justify-end">
                    {order.status === "Đang xử lý" && (
                      <button
                        className="bg-green-500 hover:bg-green-600 mr-3 text-white py-2 px-4 rounded"
                        onClick={() => handleStatusChange("Xác nhận đơn")}
                      >
                        Xác nhận đơn
                      </button>
                    )}
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4  rounded"
                      onClick={() => handleStatusChange("Hủy đơn")}
                    >
                      Hủy đơn
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  );
};

export default UserCard;
