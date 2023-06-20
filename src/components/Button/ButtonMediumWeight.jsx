import React from "react";

const ButtonMediumWeight = (props) => {
  let styles = `${props.className}  p-2 w-[200px] rounded-lg`;
  return (
    <button onClick={props.onClick} className={styles}>
      {props.children}
    </button>
  );
};

export default ButtonMediumWeight;
