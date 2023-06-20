import React from "react";

const CheckBox = (props) => {
  return (
    <>
      <input
        id="checkbox"
        type="checkbox"
        className="form-checkbox mr-2 accent-slate-600  bg-slate-600 cursor-pointer"
        key={props.key}
        value={props.value}
        onChange={props.onChange}
      />
      <label id="highlight" className="text-[15px] text-black">
        {props.children}
      </label>
    </>
  );
};

export default CheckBox;
