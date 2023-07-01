import React, { useEffect, useState } from "react";
import Headers from "../../components/Header/Headers";
import { useGetProfileQuery } from "../../api/api";
import api from "../../utils/jwtInterceptor";
import ImageCompressor from "image-compressor";

export const roleColors = {
  Admin: "text-red-500",
  user: "text-green-500",
  accounting: "text-blue-500",
};

const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [isDataProfile, setIsDataProfile] = useState();
  const [updatedUser, setUpdatedUser] = useState({ ...isDataProfile });
  const [avatarFile, setAvatarFile] = useState(null);
  const idUser = JSON.parse(localStorage.getItem("idUser"));
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setEditMode(true);
  };
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

  const handleSaveClick = () => {
    updateUser(idUser, updatedUser)
      .then((updatedUser) => {
        console.log("User updated:", updatedUser);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        // Handle error
      });
    setEditMode(false);
  };
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatarFile(reader.result);
      //Choose image large
      setUpdatedUser({ ...updatedUser, avatar: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    api
      .get("http://localhost:8080/auth/profile")
      .then((res) => {
        setIsDataProfile(res.data);
        setUpdatedUser({ ...res.data });
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <Headers />
      <div className="bg-white shadow-lg rounded-lg py-4 mt-[5%] px-[5%]">
        <div className="flex items-center mb-4">
          <img
            src={avatarFile || updatedUser.avatar}
            alt="User Avatar"
            className="w-16 h-16 rounded-full"
          />
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {updatedUser.fullName}
            </h2>
            <p className="text-gray-600">{updatedUser.email}</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold">User Information</h3>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-gray-700">Tài khoản</label>
              {editMode ? (
                <input
                  type="text"
                  name="userName"
                  value={updatedUser.userName}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-800">{updatedUser.userName}</p>
              )}
            </div>
            <div>
              <label className="text-gray-700">Giới tính</label>
              {editMode ? (
                <input
                  type="text"
                  name="sex"
                  value={updatedUser.sex}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-800">{updatedUser.sex}</p>
              )}
            </div>
            <div>
              <label className="text-gray-700">Roles</label>
              <p className={`${roleColors[updatedUser.roles?.at(0)]}`}>
                {updatedUser.roles?.at(0)}
              </p>
            </div>
            <div>
              <label className="text-gray-700">Address</label>
              {editMode ? (
                <input
                  type="text"
                  name="address"
                  value={updatedUser.address}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-800">{updatedUser.address}</p>
              )}
            </div>
            <div>
              <label className="text-gray-700">Phone Number</label>
              {editMode ? (
                <input
                  type="text"
                  name="phoneNumber"
                  value={updatedUser.phoneNumber}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-800">{updatedUser.phoneNumber}</p>
              )}
            </div>
          </div>
        </div>
        {editMode ? (
          <div className="flex justify-between mt-4">
            <div>
              <label className="text-gray-700">Upload Avatar</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-4 hover:bg-blue-600 transition-colors duration-300"
              onClick={handleSaveClick}
            >
              Save
            </button>
          </div>
        ) : (
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-gray-600 transition-colors duration-300"
            onClick={handleEditClick}
          >
            Edit
          </button>
        )}
      </div>
    </>
  );
};

export default UserProfile;
