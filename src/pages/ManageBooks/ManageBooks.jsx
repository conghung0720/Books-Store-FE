import {
  BookOpenIcon,
  ClockIcon,
  PencilIcon,
  TagIcon,
  TrashIcon,
  ArchiveBoxIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { useGetAllBooksQuery } from "../../api/api";
import api from "../../utils/jwtInterceptor";

function BookManager() {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editQuantity, setEditQuantity] = useState("");
  const [isId, setGetId] = useState("");
  const { data: isDataBooks, isSuccess, isLoading } = useGetAllBooksQuery();
  const [dataTempBooks, setDataTempBooks] = useState(isDataBooks);

  const handleMenuClick = (book) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setShowMenu(true);
    setSelectedBook(book);
    setEditTitle(book.title);
    setEditPrice(book.price);
    setEditQuantity(book.quantity);
    setGetId(book._id);
  };

  const handleEditClick = async () => {
    await api
      .patch(`/book/${isId}`, {
        quantity: editQuantity,
        price: editPrice,
      })
      .then((res) => {
        const updatedData = dataTempBooks.map((book) =>
          book._id === res.data._id ? res.data : book
        );
        setDataTempBooks(updatedData);
      });
    setShowMenu(false);
    setGetId("");
    setEditTitle("");
    setEditPrice("");
    setEditQuantity("");
  };

  const handleDeleteClick = async () => {
    await api.delete(`/book/${isId}`).then((res) => {
      const updateData = dataTempBooks.filter(
        (book) => book._id !== res.data._id
      );
      setDataTempBooks(updateData);
    });
    setShowMenu(false);
    setEditTitle("");
    setEditPrice("");
  };
  useEffect(() => {
    setDataTempBooks(isDataBooks);
  }, [isDataBooks]);

  return (
    <div className="bg-gray-100 min-h-screen relative">
      <div className="flex items-center justify-between px-4 py-2 bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          <BookOpenIcon className="w-6 h-6 text-gray-600" />
          <span className="text-xl font-bold text-gray-800">Book Manager</span>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search book"
            className="w-40 border-b border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button className="px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-600">
            Add Book
          </button>
        </div>
      </div>
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800">Books List</h1>
        <table className="mt-4 w-full bg-white shadow-sm rounded-md">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Tên sách
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Giá tiền
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Hình ảnh
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Số lượng
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading === false &&
              (dataTempBooks ? [...dataTempBooks] : isDataBooks).map((book) => (
                <tr
                  key={book._id}
                  onClick={() => handleMenuClick(book)}
                  className="border-b cursor-pointer border-gray-300 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">
                    {book._id}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">
                    {book.title.length > 30 ? (
                      <>
                        {book.title.slice(0, 20)}
                        <br />
                        {book.title.slice(20)}
                      </>
                    ) : (
                      book.title
                    )}
                  </td>
                  <td className="px-4 py-3 flex items-center space-x-1 ">
                    <TagIcon className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-800">
                      {book.price.toFixed(3)}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <img
                      src={book.images}
                      alt={book.title}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="px-4 py-3 flex items-center space-x-1">
                    <span className="text-sm font-medium text-gray-800">
                      {book.quantity}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {showMenu && (
          <div className="absolute top-0 right-0 mt-12 mr-4 bg-white shadow-md rounded-md overflow-hidden">
            <div className="px-4 py-2 flex items-center space-x-2">
              <PencilIcon className="w-5 h-5 text-gray-600" />
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="text-sm font-medium text-gray-800 focus:outline-none"
              />
            </div>
            <div className="px-4 py-2 flex items-center space-x-2">
              <TagIcon className="w-5 h-5 text-gray-600" />
              <input
                type="text"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                className="text-sm font-medium text-gray-800 focus:outline-none"
              />
            </div>
            <div className="px-4 py-2 flex items-center space-x-2">
              <ArchiveBoxIcon className="w-5 h-5 text-gray-600" />
              <input
                type="text"
                value={editQuantity}
                onChange={(e) => setEditQuantity(e.target.value)}
                className="text-sm font-medium text-gray-800 focus:outline-none"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleEditClick}
                className="px-4 py-2 flex items-center space-x-2 hover:bg-gray-50"
              >
                <PencilIcon className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-800">Edit</span>
              </button>
              <button
                onClick={handleDeleteClick}
                className="px-4 py-2 flex items-center space-x-2 hover:bg-gray-50"
              >
                <TrashIcon className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-800">
                  Delete
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between space-x-4">
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
          Previous
        </button>
        <span className="text-sm font-medium text-gray-800">Page 1 of 10</span>
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
          Next
        </button>
      </div>
    </div>
  );
}

export default BookManager;
