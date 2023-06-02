import React from "react";

const DefaultButton = (props) => {
  let styles = props.className || "";
  return (
    <button className={`${styles} px-12 py-3 rounded-xl bg-rose-400 ml-[45%]`}>
      Xem thêm
    </button>
  );
};

export default DefaultButton;
