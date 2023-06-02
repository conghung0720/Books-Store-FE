import React from "react";
import DisplayListBooks from "../../components/DisplayListBooks/DisplayListBooks";
import DefaultButton from "../../components/Button/DefaultButton";
import { Link } from "react-router-dom";

const FlashSale = () => {
  return (
    <div className=" w-[90%] m-auto">
      <div className="w-[100%] m-auto h-[60px] flex items-center bg-yellow-100 rounded-lg">
        <h5 className="ml-3 font-semibold  text-[19px] ">Flash Sale</h5>
      </div>
      <DisplayListBooks />
      <Link to="/flashsale">
        <DefaultButton className="m-6" />
      </Link>
    </div>
  );
};

export default FlashSale;
