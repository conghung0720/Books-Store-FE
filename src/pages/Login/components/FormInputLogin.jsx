import React from "react";

const FormInputAuth = (props) => {
  return (
    <>
      <label className="flex-block text-[14px] font-medium inter">
        {props.TextForm}
      </label>
      <div className="flex-block">
        <input
          onChange={props.onChange}
          minLength={props.minLength}
          min={props.min}
          max={props.max}
          type={props.type}
          value={props.value}
          id={props.id}
          className="rouned-lg h-[45px] w-[565px] text-[14px] font-medium color-input-login focus:outline-none px-[5%] "
        />
      </div>
    </>
  );
};

export default FormInputAuth;
