import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetUserIdQuery,
  useGetListOrderUserQuery,
  useUpdateUserMutation,
} from "../../../api/api";
import api from "../../../utils/jwtInterceptor";

const UserCard = () => {
  const { idUser } = useParams();
  const { data: user, isSuccess } = useGetUserIdQuery(idUser);
  const { data: orderUser, isSuccess: isSuccess2 } =
    useGetListOrderUserQuery(idUser);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);

  const updateUser = async (id, updatedFields) => {
    try {
      const response = await api.put(
        `http://localhost:8080/user/${id}`,
        updatedFields
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleEdit = () => {
    setUpdatedUser(user);
    setIsEditing(true);
  };

  const handleSave = () => {
    updateUser(updatedUser._id, updatedUser);
    setIsEditing(false);
    window.location.reload();
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleStatusChange = () => {};

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
          {!isEditing ? (
            <>
              <p className="text-gray-600 mb-4">{user?.userName}</p>
              <p className="text-gray-600 mb-4">
                <span className="font-bold">Email:</span> {user.email}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-bold">Số điện thoại:</span>{" "}
                {user.phoneNumber}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-bold">Địa chỉ:</span> {user.address}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-bold">Giới tính:</span>{" "}
                {user.sex === "male" ? "Nam" : "Nữ"}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-bold">Vai trò:</span>{" "}
                {user.roles.join(", ")}
              </p>
              <div className="flex justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                  onClick={handleEdit}
                >
                  Chỉnh sửa
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
                  Xóa
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-600 mb-4 ">{user?.userName}</p>
              <p className="text-gray-600 mb-4">
                <span className="font-bold">Email:</span>
                <input
                  type="text"
                  name="email"
                  value={updatedUser.email}
                  onChange={handleChange}
                  placeholder="Thay đổi email"
                  className="text-gray-600 mb-4 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-bold">Số điện thoại:</span>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Thay đổi số điện thoại"
                  value={updatedUser.phoneNumber}
                  onChange={handleChange}
                  className="text-gray-600 mb-4 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-bold">Địa chỉ:</span>
                <input
                  type="text"
                  name="address"
                  placeholder="Thay đổi địa chỉ"
                  value={updatedUser.address}
                  onChange={handleChange}
                  className="text-gray-600 mb-4 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-bold">Giới tính:</span>
                <select
                  name="sex"
                  value={updatedUser.sex}
                  onChange={handleChange}
                  className="text-gray-600 mb-4 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-bold">Quyền:</span>
                <input
                  type="text"
                  name="roles"
                  value={updatedUser.roles}
                  onChange={handleChange}
                  className="text-gray-600 mb-4 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </p>
              <div className="flex justify-between">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                  onClick={handleSave}
                >
                  Lưu
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                  onClick={handleCancel}
                >
                  Hủy
                </button>
              </div>
            </>
          )}
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
