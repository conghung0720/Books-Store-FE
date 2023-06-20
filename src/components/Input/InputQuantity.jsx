import React, { useEffect, useRef, useState } from "react";
import { MinusIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addValue,
  decrement,
  increment,
} from "../../store/features/countValueInput";
import { addItems } from "../../store/features/cartSlice";

const InputQuantity = (props) => {
  const ref = useRef(null);
  const [value, setValue] = useState(props.value || 1);
  const [data, setData] = useState(() => {
    const storedItems = localStorage.getItem("cart");
    return storedItems ? JSON.parse(storedItems) : [];
  });
  const dispatch = useDispatch();
  const Subtract = () => {
    let value = +ref.current.value;
    if (value <= 1) return;
    else {
      ref.current.value = value - 1;
      setValue(ref.current.value);
      const getExistData = data?.map((value) => {
        if (value._id === props._id) {
          value.quantity -= +1;
          return {
            ...value,
            quantity: value.quantity,
          };
        } else {
          return {
            ...value,
          };
        }
      });
      localStorage.setItem("cart", JSON.stringify(getExistData));
      setData(JSON.parse(localStorage.getItem("cart")));
      dispatch(decrement());
      dispatch(addItems(JSON.parse(localStorage.getItem("cart"))));
    }
  };

  const Minus = () => {
    let value = +ref.current.value;

    if (ref.current.value >= props.quantity) {
      console.log(`Khong duoc lon hon ${props.quantity}`);
    } else {
      ref.current.value = value + 1;
      setValue(ref.current.value);

      dispatch(increment());
    }
  };

  const changeValueInput = (e) => {
    console.log(e.target.value);
    if (e.target.value >= props.quantity) console.log("K");
    else {
      ref.current.value = e.target.value;
      setValue(ref.current.value);
      dispatch(addValue(+ref.current.value));
    }
  };

  return (
    <div className="rounded-lg border-black border-2 w-[120px] flex h-[40px]">
      <button
        className="flex justify-center items-center w-[25%]"
        onClick={Subtract}
      >
        <MinusIcon className="h-5 w-5" />
      </button>
      <input
        onChange={changeValueInput}
        ref={ref}
        type="text"
        className="h-full w-[50%] focus:outline-none text-center"
      />
      <button
        className="flex justify-center items-center w-[25%] "
        onClick={Minus}
      >
        <PlusIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default InputQuantity;
