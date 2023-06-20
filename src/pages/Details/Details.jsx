import React, { useEffect } from "react";
import FormBuy from "./FormBuy";
import Headers from "../../components/Header/Headers";
import FormComment from "./Comment/FormComment";
import ReviewFeature from "./ModalReview/ReviewFeature";
import { useParams } from "react-router-dom";
import { useGetIdBooksQuery } from "../../api/api";
import { useSelector } from "react-redux";

const Details = () => {
  const { idBook } = useParams();
  const { data, isSuccess } = useGetIdBooksQuery(idBook);
  const getItems = useSelector((state) => state.cart);

  return (
    <>
      <Headers />
      {isSuccess && <FormBuy data={data} />}
      <ReviewFeature />
      <FormComment />
    </>
  );
};

export default Details;
