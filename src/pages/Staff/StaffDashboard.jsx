import React, { useState } from "react";
import ManageUsers from "../Info/ManageUser/ManageUser";
import OrderDetails from "../ManageOrderUser";
import { Link, useParams } from "react-router-dom";
import AddBookForm from "./AddBooks";
import CategoryManagement from "../ManageCategory/ManageCategory";
import BookManager from "../ManageBooks/ManageBooks";

const menuItems = [
  //   { name: "Dashboard", icon: "📊", link: "/" },
  {
    name: "Quản lý đơn hàng",
    icon: "🛒",
    link: "/manage-order",
    router: <OrderDetails />,
  },
  {
    name: "Thêm sách",
    icon: "📦",
    link: "/add-books",
    router: <AddBookForm />,
  },
  {
    name: "Quản lý khách hàng",
    icon: "👥",
    link: "/manage-users",
    router: <ManageUsers />,
  },
  { name: "Categories", icon: "📚", router: <CategoryManagement /> },
  { name: "Quản lý kho sách", icon: "🏷️", router: <BookManager /> },
];

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("Quản lý đơn hàng");
  const { idMenu } = useParams();
  const handleMenu = (name) => {
    setActiveMenu(name);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-white p-4 border-r border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-gray-900 font-bold text-xl">Admin</h1>
          <Link to="/">
            <button className="bg-slate-600 text-white rounded-lg px-2 py-1 text-sm">
              Trang chủ
            </button>
          </Link>
        </div>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`${
                activeMenu === item.name
                  ? "bg-blue-600 text-white"
                  : "text-gray-600"
              } flex items-center space-x-2 rounded-lg px-4 py-2 cursor-pointer`}
              onClick={() => handleMenu(item.name)}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 p-4">
        {/* Add the content for each page here */}
        {
          menuItems.filter((nameMenu) => nameMenu.name === activeMenu).at(0)
            .router
        }
        {/* <OrderDetails /> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
