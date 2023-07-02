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
      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tên
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Chi tiết
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isSuccess &&
              data.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Link
                      to={`/user/${user._id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Xem Chi Tiết
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
