import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useRef, useState } from "react";
import InputQuantity from "../../../components/Input/InputQuantity";
import { useSelector } from "react-redux";

const ItemsCart = (props) => {
  const ref = useRef(null);
  const [value, setValue] = useState(1);
  const { selectedItem } = props;

  const Subtract = () => {
    if (props.onSubtract) {
      props.onSubtract(props._id);
    }
  };
  const handleAdd = () => {
    if (props.onAdd) {
      props.onAdd(props._id);
    }
  };
  const handleDelete = () => {
    if (props.onDelete) {
      props.onDelete(props._id);
    }
  };

  return (
    <div className="border-blue-600 border-2 p-2 w-[95%] rounded-lg m-auto flex">
      <img src={props.image} className=" h-[120px] w-[120px]" />
      <div className="w-[78%] flex">
        <div className="border-rose-600 border-2 w-[70%]">
          <span>{props.title}</span>
        </div>
        <div className="w-[22%] flex justify-center flex-wrap">
          <span className="mt-5">{props.price.toFixed(3)}</span>
          <div className="rounded-lg border-black border-2 w-[120px] flex h-[40px]">
            <button
              className="flex justify-center items-center w-[25%]"
              onClick={Subtract}
            >
              <MinusIcon className="h-5 w-5" />
            </button>
            <input
              value={props.value}
              type="text"
              className="h-full w-[50%] focus:outline-none text-center"
            />
            <button
              className="flex justify-center items-center w-[25%] "
              disabled={selectedItem && props.value >= selectedItem.quantity}

              onClick={handleAdd}
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>{" "}
        </div>
      </div>
      <TrashIcon
        className="h-6 w-6 m-auto cursor-pointer"
        onClick={handleDelete}
      />
    </div>
  );
};

export default ItemsCart;
