import React from "react";
import { useGetAllBooksQuery } from "../../api/api";

function ListBooks() {
  const { data: isData, isSuccess } = useGetAllBooksQuery();
  const categories = [
    { id: 1, name: "Tiểu thuyết" },
    { id: 2, name: "Khoa học" },
    { id: 3, name: "Lịch sử" },
  ];
  return (
    <div className="bg-gray-100 min-h-screen px-[5%]">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1">
            <div className="bg-white shadow-lg rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Danh mục</h2>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <a href="#" className="text-gray-700 hover:text-gray-900">
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-8">
              {isSuccess &&
                isData.map((book) => (
                  <div
                    key={book.id}
                    className="bg-white shadow-lg rounded-lg p-4 flex items-center transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    <div className="w-1/3">
                      <img
                        src={book.images}
                        alt={book.title}
                        className="w-[130px] h-auto rounded-lg"
                      />
                    </div>
                    <div className="w-2/3">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {book.title}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        Giá: {book.price.toFixed(3)}đ
                      </p>
                      {book.flashSale?.salePrice > 0 && (
                        <div className="bg-yellow-100 text-yellow-800 rounded-md py-1 px-2 mb-2">
                          <p className="font-semibold">
                            Giảm giá: {book.flashSale.salePrice * 100}%
                          </p>
                        </div>
                      )}

                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 transition-colors duration-300">
                        Mua ngay
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListBooks;
