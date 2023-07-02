import React, { useState } from "react";
import Autocomplete from "react-autocomplete";

const categories = [
  "All",
  "Books",
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Sports & Outdoors",
];

const Category = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const getFilteredBooks = () => {
    if (!data) {
      return [];
    }

    const filteredBooks = data
      .filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => b.buyQuantity - a.buyQuantity);

    return filteredBooks.slice(0, 4);
  };

  return (
    <div className="flex flex-col bg-gray-100">
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-gray-900 font-bold text-3xl">Products</h1>
          <div className="relative w-64">
            <Autocomplete
              getItemValue={(item) => item.title}
              items={getFilteredBooks()}
              renderItem={(item, isHighlighted) => (
                <div
                  key={item._id}
                  className={`p-2 ${isHighlighted ? "bg-blue-200" : ""}`}
                >
                  {item.title}
                </div>
              )}
              value={searchTerm}
              onChange={handleSearch}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="Tìm kiếm"
                  className="w-full border border-gray-300 rounded-lg py-2 px-4 pl-10 text-gray-600"
                />
              )}
            />
            <span className="absolute top-0 left-0 mt-3 ml-3 text-gray-400">
              🔍
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${
                category === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              } rounded-lg px-4 py-2 text-sm`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
