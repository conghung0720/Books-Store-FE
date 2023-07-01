import React, { useState } from "react";
import { useGetAllUserQuery } from "../../../api/api";
import { Link } from "react-router-dom";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState("");
  const [editUserName, setEditUserName] = useState("");
  const [editUserKey, setEditUserKey] = useState("");
  const { data, isSuccess } = useGetAllUserQuery();

  const handleAddUser = () => {
    const newUser = {
      id: Date.now().toString(),
      name: editUserName,
      key: editUserKey,
    };

    setUsers([...users, newUser]);
    setEditUserName("");
    setEditUserKey("");
  };

  const handleEditUser = (userId) => {
    const userToEdit = users.find((user) => user._id === userId);
    setEditUserId(userToEdit._id);
    setEditUserName(userToEdit.name);
    setEditUserKey(userToEdit.key);
  };

  const handleUpdateUser = () => {
    const updatedUsers = users.map((user) =>
      user._id === editUserId
        ? { ...user, name: editUserName, key: editUserKey }
        : user
    );
    setUsers(updatedUsers);
    setEditUserId("");
    setEditUserName("");
    setEditUserKey("");
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user._id !== userId);
    setUsers(updatedUsers);
  };

  return (
    <div className="container mx-auto py-8 px-10">
      <h1 className="text-2xl font-bold mb-4">Quản lý user</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Name"
          value={editUserName}
          onChange={(e) => setEditUserName(e.target.value)}
          className="mr-2 px-4 py-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Key"
          value={editUserKey}
          onChange={(e) => setEditUserKey(e.target.value)}
          className="mr-2 px-4 py-2 border border-gray-300 rounded"
        />
        {editUserId ? (
          <button
            onClick={handleUpdateUser}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Update User
          </button>
        ) : (
          <button
            onClick={handleAddUser}
            className="bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded"
          >
            Thêm mới
          </button>
        )}
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="border-b border-gray-300 py-2 px-4">ID</th>
            <th className="border-b border-gray-300 py-2 px-4">Tên</th>
            <th className="border-b border-gray-300 py-2 px-4">Chi tiết</th>
            <th className="border-b border-gray-300 py-2 px-4">Xử lý</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess &&
            data.map((user) => (
              <tr key={user._id}>
                <td className="border-b border-gray-300 py-2">{user._id}</td>
                <td className="border-b border-gray-300 py-2 px-4">
                  {user.fullName}
                </td>
                <td className="border-b border-gray-300 py-2 px-4">
                  <Link to={`/user/${user._id}`}>Chi Tiết</Link>
                </td>
                <td className="border-b border-gray-300 py-2 px-4">
                  <button
                    onClick={() => handleEditUser(user.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
