import React from "react";
import RatingStar from "../../../utils/ratingStar";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useGetUserIdQuery } from "../../../api/api";

const UserComment = (props) => {
  const { data, isSuccess } = useGetUserIdQuery(props.idUser);
  const handleEditComment = () => {};

  const handleDeleteComment = () => {};

  return (
    isSuccess && (
      <div className=" mb-4 p-3 flex">
        <div className="w-[15%]">
          <div className="rounded-full overflow-hidden ml-[2%] h-12 w-12">
            <img
              src={data.avatar}
              alt="Avatar"
              className="object-cover h-full w-full"
            />
          </div>
          <h1 className="font-bold">{data.fullName}</h1>
          <span className="text-[14px] text-gray-600">{props.date}</span>
        </div>
        <div className="w-[85%]">
          <div className="flex items-center">
            <RatingStar rating={props.rating} />
            <button
              className="text-gray-600 hover:text-gray-800 focus:outline-none ml-[85%]"
              onClick={() => handleEditComment(props.commentId)}
            >
              <PencilIcon className="h-5 w-5" />
            </button>{" "}
          </div>
          <div className="mt-2">
            <span className="text-gray-800 font-normal tracking-tight whitespace-normal">
              {props.comment}
            </span>
          </div>
        </div>
      </div>
    )
  );
};

export default UserComment;
