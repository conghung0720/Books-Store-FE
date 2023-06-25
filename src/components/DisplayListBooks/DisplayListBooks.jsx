import React, { useState } from "react";
import * as Progress from "@radix-ui/react-progress";

const DisplayListBooks = ({ displayNumRowBooks = 1, data }) => {
  let sizeHeightFormDisplay = `h-[${350 * displayNumRowBooks}px]`;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-[3%]">
      {data.map((item) => (
        <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white h-[350px]">
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full h-40 object-cover"
          />

          <div className="px-4 py-2">
            <h3 className="text-gray-900 font-medium text-base truncate">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm mb-2">Author: {item.author}</p>
            <p className="text-gray-600 text-sm mb-2">Price: {item.price}đ</p>
            <p className="text-gray-600 text-sm mb-2">
              Quantity: {item.quantity}
            </p>
            {item.flashSale && (
              <div className="bg-blue-500 text-white rounded-lg px-2 py-1 inline-block text-xs">
                Flash Sale
              </div>
            )}
            {item.flashSale && (
              <div className="bg-orange-500 ml-2 text-white rounded-lg px-2 py-1 inline-block text-xs">
                {Math.floor(item.flashSale.salePrice * 100)}% off
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayListBooks;
