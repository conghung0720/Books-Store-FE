import React, { useState } from "react";
import * as Progress from "@radix-ui/react-progress";

const data = [
  {
    id: "1",
    author: "Tony Buổi Sáng",
    title: "Trên Đường Băng (Tái Bản 2022)",
    images: [
      "https://cdn0.fahasa.com/media/catalog/product/n/x/nxbtre_full_05422022_014206.jpg",
    ],
    rate: 52500,
    quantity: 50,
    publisher: "FIRST NEWS",
    supplier: "Tổng Hợp Thành Phố Hồ Chí Minh",
    flash_sales: [
      {
        start_date: "2023-06-01",
        end_date: "2023-06-05",
        sale_price: 0.25,
        sale_quantity: 50,
      },
    ],
  },
  {
    id: "2",
    author: "Rosie Nguyễn",
    title: "Tuổi Trẻ Đáng Giá Bao Nhiêu (Tái Bản 2021)",
    images: [
      "https://cdn0.fahasa.com/media/catalog/product/8/9/8934974150350_1_1_1.jpg",
    ],
    rate: 72500,
    quantity: 40,
    publisher: "FIRST NEWS",
    supplier: "NXB Hội Nhà Văn",
    flash_sales: [
      {
        start_date: "2023-06-01",
        end_date: "2023-06-05",
        sale_price: 0.79,
        sale_quantity: 35,
      },
    ],
  },
  {
    id: "3",
    author: "Lư Tư Hạo",
    title: "Dám Mơ Lớn, Đừng Hoài Phí Tuổi Trẻ (Tái Bản)    ",
    images: [
      "https://cdn0.fahasa.com/media/catalog/product/8/9/8934974150350_1_1_1.jpg",
    ],
    rate: 72500,
    quantity: 40,
    publisher: "Skybooks",
    supplier: "Phụ Nữ Việt Nam",
    flash_sales: [
      {
        start_date: "2023-06-01",
        end_date: "2023-06-05",
        sale_price: 0.45,
        sale_quantity: 40,
      },
    ],
  },
  {
    id: "4",
    author: "Lư Tư Hạo",
    title: "Dám Mơ Lớn, Đừng Hoài Phí Tuổi Trẻ (Tái Bản)    ",
    images: [
      "https://cdn0.fahasa.com/media/catalog/product/9/7/9781408898123_4_thanh_ly.jpg",
    ],
    rate: 72500,
    quantity: 40,
    publisher: "Skybooks",
    supplier: "Phụ Nữ Việt Nam",
    flash_sales: [
      {
        start_date: "2023-06-01",
        end_date: "2023-06-05",
        sale_price: 0.5,
        sale_quantity: 30,
      },
    ],
  },
];

const DisplayListBooks = ({ displayNumRowBooks = 1 }) => {
  let sizeHeightFormDisplay = `h-[${350 * displayNumRowBooks}px]`;

  return (
    <div className={sizeHeightFormDisplay + " w-full flex justify-evenly"}>
      {data.map((value) => {
        return (
          <div className=" mt-[4%] cursor-pointer bg-white rounded-lg w-[20%] hover:shadow-2xl">
            <div className="h-[100%] w-[100%] items-center block">
              <div className="">
                <div className="rounded-[100%] bg-orange-500 h-10 w-10 ml-[15%] text-center flex items-center justify-center absolute">
                  {value.flash_sales[0]["sale_price"] * 100}%
                </div>
                <img
                  src={value.images[0]}
                  className="h-[230px] w-full object-cover mt-3"
                />
              </div>
              <div className="h-[50px] mt-3">
                <h5 className="px-2 font-sans">{value.title}</h5>
              </div>
              <h3 className="px-2 mt-2 text-yellow-500 text-[20px] font-bold">
                {value.rate}đ
              </h3>
              <h4 className="px-2 line-through text-gray-500 mt-[-7px]">
                {value.flash_sales[0]["sale_price"] * value.rate}
              </h4>
              <div className="">
                <Progress.Root
                  className="relative overflow-hidden bg-rose-300 rounded-full w-[95%] m-auto h-[23px] mb-3 mt-2"
                  style={{
                    transform: "translateZ(0)",
                  }}
                  value={value.author}
                >
                  <Progress.Indicator
                    className="bg-rose-600 w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
                    value="12"
                    style={{
                      transform: `translateX(-${
                        50 - value.flash_sales[0]["sale_quantity"]
                      }%)`,
                    }}
                  >
                    <h1 className="text-center mb-2 text-white">
                      Đã bán: {value.flash_sales[0]["sale_quantity"]}
                    </h1>
                  </Progress.Indicator>
                </Progress.Root>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayListBooks;
