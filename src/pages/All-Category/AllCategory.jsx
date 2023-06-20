import React from "react";
import SideBar from "./SideBar";
import Headers from "../../components/Header/Headers";
import { data } from "../Home/FlashSale";
import DisplayListBooks from "../../components/DisplayListBooks/DisplayListBooks";
import RatingStar from "../../utils/ratingStar";
const AllCategory = () => {
  return (
    <>
      <Headers />
      <main className="flex mt-[3%]">
        <SideBar />
        <div className="w-[90%]">
          <div className="border-red-600 border-2 h-[10%] w-[93%] m-auto">
           f
          </div>
          <DisplayListBooks displayNumRowBooks="3" data={data} />
        </div>
      </main>
    </>
  );
};

export default AllCategory;
