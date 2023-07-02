import React, { useState } from "react";
import * as Progress from "@radix-ui/react-progress";
import { Link } from "react-router-dom";

const DisplayListBooks = ({ displayNumRowBooks = 1, data }) => {
  let sizeHeightFormDisplay = `h-[${350 * displayNumRowBooks}px]`;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-[5%]">
      {data.map((item) => (
        <Link to={`/details/${item._id}`}>
          <div className="max-w-xs rounded overflow-hidden shadow-lg bg-gray-50 h-[400px]">
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-full h-56 object-cover"
            />
            <div className="px-4 py-2">
              <h3 className="text-gray-900 font-medium text-lg truncate">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                Author: {item.author}
              </p>
              <p className="text-gray-600 text-sm mb-2">Price: {item.price}đ</p>
              <p className="text-gray-600 text-sm mb-2">
                Quantity: {item.quantity}
              </p>
              {item.flashSale && (
                <div className="bg-blue-600 text-white rounded-lg px-2 py-1 inline-block text-xs">
                  Flash Sale
                </div>
              )}
              {item.flashSale && (
                <div className="bg-yellow-400 ml-2 text-white rounded-lg px-2 py-1 inline-block text-xs">
                  {Math.floor(item.flashSale.salePrice * 100)}% off
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DisplayListBooks;
