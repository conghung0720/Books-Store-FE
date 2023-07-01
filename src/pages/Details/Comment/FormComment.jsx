import React from "react";
import UserComment from "./UserComment";
import { useGetCommentsOfBookQuery } from "../../../api/api";
import { useParams } from "react-router-dom";
import { convertDate } from "../../../utils/convertDate";

const FormComment = () => {
  const { idBook } = useParams();
  const { data: isData, isSuccess } = useGetCommentsOfBookQuery(idBook);

  // isSuccess && console.log(isData.at(0).user);

  return (
    <div className="w-[80%] rounded-lg m-auto shadow-2xl border-2 mb-5 divide-y-2 divide-neutral-500 divide-dashed">
      {isSuccess &&
        [...isData].reverse().map((value, index) => {
          return (
            <UserComment
              rating={value.rating}
              comment={value.comments}
              idUser={value.user}
              date={convertDate(value.dateComment)}
            />
          );
        })}
    </div>
  );
};

export default FormComment;
