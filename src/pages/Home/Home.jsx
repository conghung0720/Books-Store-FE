import React, { useEffect, useState } from "react";
import Headers from "../../components/Header/Headers";
import AdsBanner from "./AdsBanner/AdsBanner";
import DisplayItemsBook from "./DisplayListBook/DisplayItemsBook";
import Footer from "../../components/Footer/Footer";
import { useGetAllBooksQuery, useGetListFlashSaleQuery } from "../../api/api";
import AvatarBot from "../../img/avatarChatBot.jpg";
import ChatBox from "../Chat-GPT/Chat";
import axios from "axios";
import api from "../../utils/jwtInterceptor";
import { useSelector } from "react-redux";
const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDisplayChatBot, setDisplayChatBot] = useState(false);
  const [isDataBestSeller, setDataBestSeller] = useState([]);
  const [isDataFlashSale, setDataFlashSale] = useState([]);
  const [data, setData] = useState([]);
  const getData = useSelector((state) => state.cart);

  const getItemCart = useSelector((state) => state.cart);
  console.log(getItemCart);

  useEffect(() => {
    api
      .get("http://localhost:8000/book")
      .then((res) => {
        setData(res.data);
        setIsSuccess(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsSuccess(false);
      });
  }, []);

  useEffect(() => {
    const dataBestSeller = data?.toSorted((a, b) => {
      if (a.buyQuantity < b.buyQuantity) return 1;
      if (a.buyQuantity > b.buyQuantity) return -1;
    });

    const dataHighestFlashSale = data?.toSorted((a, b) => {
      if (a.flashSale?.salePrice < b.flashSale?.salePrice) return 1;
      if (a.flashSale?.salePrice > b.flashSale?.salePrice) return -1;
    });
    dataBestSeller && setDataBestSeller(dataBestSeller);
    dataHighestFlashSale && setDataFlashSale([...dataHighestFlashSale]);
  }, [data, isSuccess, isLoading]);

  const displayChatBot = () => {
    setDisplayChatBot(!displayChatBot);
  };

  return (
    <>
      <main className=" bg-home py-[2%]">
        <img
          className="rounded-[50%] fixed right-10 bottom-5 h-[70px] w-[70px] cursor-pointer"
          src={AvatarBot}
          onClick={() => displayChatBot}
        />
        {
          <div className=" scrollbar-thumb-gray-900 scrollbar-track-gray-100 scrollbar-thin w-[400px] h-[400px] overflow-hidden overflow-y-auto fixed right-5 bottom-20 z-50 bg-slate-300 rounded-lg">
            <ChatBox />
          </div>
        }
        <div className=" m-auto w-[90%]">
          <Headers />
          <AdsBanner />
          {isSuccess && (
            <DisplayItemsBook data={isDataBestSeller}>
              <div className="flex justify-between h-[40px] w-[90%] m-auto my-[4%]">
                <h1 className="text-[20px] font-extrabold">Best Sellers</h1>
                <ul className=" flex space-x-7 text-slate-800 mr-[8%]">
                  <li>Trinh Thám</li>
                  <li>Trữ Tình</li>
                  <li>Khoa Học</li>
                  <li>Trữ Tình</li>
                  <li>Khoa Học</li>
                  <li>Chính Trị</li>
                </ul>
              </div>
            </DisplayItemsBook>
          )}
          <DisplayItemsBook data={isDataFlashSale}>
            <div className=" h-[10%] text-center">
              <h1 className="montserrat font-extrabold text-[30px] my-5 title-home-ads">
                Flash Sale
              </h1>
            </div>
          </DisplayItemsBook>
          <div className="">
            <h1 className="montserrat font-black text-[30px] mb-[5%] text-center">
              Chi Nhánh
            </h1>
            <ul className="flex justify-between">
              <li className="flex justify-center items-center text-center space-x-5">
                <h1 className="text-[40px] font-black">35</h1>
                <span>Tỉnh/Thành Phố</span>
              </li>
              <li className="flex justify-center items-center text-center space-x-5">
                <h1 className="text-[40px] font-black">858</h1>
                <span>Thể Loại Sách, Truyện</span>
              </li>
              <li className="flex justify-center items-center text-center space-x-5">
                <h1 className="text-[40px] font-black">3544</h1>
                <span>Cộng Tác Viên</span>
              </li>
              <li className="flex justify-center items-center text-center space-x-5">
                <h1 className="text-[40px] font-black">35</h1>
                <span>Chi Nhánh Trên Toàn Quốc</span>
              </li>
            </ul>
          </div>
          <div className=" text-center mt-[5%]">
            <h1 className="text-[30px] font-bold mb-[5%]">Lời Cám Ơn</h1>
            <span className="px-10">
              Lời Cám Ơn Chúng tôi xin chân thành cảm ơn quý khách đã đến mua
              sách tại nhà sách của chúng tôi. Chúng tôi hi vọng quý khách đã có
              những trải nghiệm thú vị và tìm được những cuốn sách hữu ích cho
              bản thân và gia đình. Với sự tin tưởng và ủng hộ của quý khách,
              chúng tôi sẽ tiếp tục cung cấp các sản phẩm sách chất lượng và
              dịch vụ tốt nhất cho khách hàng. Chúng tôi luôn cập nhật các tác
              phẩm mới nhất và đa dạng các thể loại sách để đáp ứng nhu cầu đa
              dạng của khách hàng. Một lần nữa, chúng tôi xin chân thành cảm ơn
              quý khách đã tin tưởng và ủng hộ nhà sách của chúng tôi. Chúc quý
              khách đọc sách vui vẻ và có những trải nghiệm tuyệt vời.
            </span>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
