import React, { useEffect, useState } from "react";
import { useGetAllCategoryQuery } from "../../api/api";
import api from "../../utils/jwtInterceptor";

const categories = [
  { id: 1, name: "Fiction" },
  { id: 2, name: "Non-fiction" },
  { id: 3, name: "Children" },
  { id: 4, name: "Romance" },
  { id: 5, name: "Thriller" },
];

const CategoryManagement = () => {
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [categories, setCategories] = useState();
  const { data: isCategory, isSuccess } = useGetAllCategoryQuery();

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await api
      .post("/category/create", {
        name,
      })
      .then((res) => {
        setCategories([...categories, res.data]);
      })
      .catch((err) => console.log(err));
    setName("");
  };

  const handleEdit = (id) => {
    const editName = isCategory.find((cat) => cat._id === id).name;
    setName(editName);
    setEditId(id);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    setName("");
    setEditId(null);
  };

  const handleDelete = (id) => {
    console.log(id);
  };

  useEffect(() => {
    setCategories(isCategory);
  }, [isCategory]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="bg-white p-4 border-b border-gray-200">
        <h1 className="text-gray-900 font-bold text-3xl">Quản lý category</h1>
      </div>
      <div className="p-5">
        <form
          onSubmit={editId ? handleUpdate : handleAdd}
          className="max-w-lg mx-auto flex items-center space-x-4"
        >
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-600"
            placeholder="Enter the category name"
            value={name}
            onChange={handleName}
            required
          />
          <button
            type="submit"
            className={`${
              editId ? "bg-yellow-600" : "bg-blue-600"
            } text-white rounded-lg py-2 px-4 text-sm`}
          >
            {editId ? "Sửa" : "Thêm"}
          </button>
        </form>
        <div className="max-w-3xl mx-auto mt-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-gray-600 font-medium text-sm">
                  ID
                </th>
                <th className="border border-gray-300 px-4 py-2 text-gray-600 font-medium text-sm">
                  Tên
                </th>
                <th className="border border-gray-300 px-4 py-2 text-gray-600 font-medium text-sm">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {categories?.length > 0 &&
                categories.map((cat) => (
                  <tr key={cat._id} className="bg-white">
                    <td className="border border-gray-300 px-4 py-2 text-gray-900 font-medium text-sm">
                      {cat._id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-900 font-medium text-sm">
                      {cat.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(cat._id)}
                        className="bg-yellow-600 text-white rounded-lg px-2 py-1 text-xs"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(cat._id)}
                        className="bg-red-600 text-white rounded-lg px-2 py-1 text-xs"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement;
