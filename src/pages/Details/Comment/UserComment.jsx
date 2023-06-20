import React from "react";
import RatingStar from "../../../utils/ratingStar";

const UserComment = (props) => {
  return (
    <div className=" mb-4 p-3 flex">
      <div className="w-[15%]">
        <h1 className="font-bold">{props.username}</h1>
        <span className="text-[14px] text-gray-600">{props.date}</span>
      </div>
      <div className="w-[85%]">
        <div className="flex">
          <RatingStar rating={props.rating} />
        </div>
        <div className="mt-2">
          <span className="text-gray-800 font-normal tracking-tight whitespace-normal">
            {props.comment}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserComment;
