import React from "react";
import RatingStar from "../../../utils/ratingStar";
import ButtonMediumWeight from "../../../components/Button/ButtonMediumWeight";
import { PencilIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";

const ReviewFeature = () => {
  return (
    <div className="w-[80%] p-2 m-auto mt-[5%] border-2 shadow-lg h-[200px] rounded-lg flex mb-[20px]">
      <div className="w-[50%] mt-5">
        <div className="">
          <h4 className="font-medium text-[20px] ml-3">Bình luận về sách</h4>
        </div>
        <div className="h-[80%] p-3 w-full flex">
          <div className="w-[30%] text-center">
            <h1 className="font-bold text-[30px]">0/5</h1>
            <div className="flex text-center items-center justify-center">
              <RatingStar rating={0} trigger="" className="cursor-pointer" />
            </div>
            <span className="text-slate-700">(0) đánh giá</span>
          </div>
        </div>
      </div>

      <div className="w-[60%] flex">
        <Modal />
      </div>
    </div>
  );
};

export default ReviewFeature;
