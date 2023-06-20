import React from "react";
import DisplayListBooks from "../../components/DisplayListBooks/DisplayListBooks";
import DefaultButton from "../../components/Button/DefaultButton";
import { Link } from "react-router-dom";

export const data = [
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

const FlashSale = () => {
  return (
    <div className=" w-[90%] m-auto">
      <div className="w-[100%] m-auto h-[60px] flex items-center bg-yellow-100 rounded-lg">
        <h5 className="ml-3 font-semibold  text-[19px] ">Flash Sale</h5>
      </div>
      <DisplayListBooks data={data} />
      <Link to="/flashsale">
        <DefaultButton className="m-6" />
      </Link>
    </div>
  );
};

export default FlashSale;
