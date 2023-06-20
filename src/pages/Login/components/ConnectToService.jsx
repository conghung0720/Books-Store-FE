import React from "react";

const ConnectToService = (props) => {
  return (
    <div className="w-[50%]  justify-center flex items-center">
      <img src={props.LogoConnect} className="w-[30px] h-[30px]" />
      <span className="text-normal font-normal inter text-black text-[13px] py-[10%]">
        {props.connectTo}
      </span>
    </div>
  );
};

export default ConnectToService;
