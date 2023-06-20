import React, { useEffect, useState } from "react";
import Banner from "../../img/logoRegister.png";
import Logo from "../../img/logo.png";

import FormInputAuth from "../Login/components/FormInputLogin";
import ButtonMediumWeight from "../../components/Button/ButtonMediumWeight";
import { useNavigate } from "react-router-dom";
import { useGetRegisterMutation } from "../../api/api";

const Register = () => {
  const [getRegister, { isLoading, isSuccess }] = useGetRegisterMutation();
  const [valueFormRegister, setValueFormRegister] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const getValue = async (event) => {};
  let navigate = useNavigate();
  const submit = async (event) => {
    try {
      const id = Math.random();
      const valueUserName = document.getElementById("username").value;
      const valueFullName = document.getElementById("fullname").value;
      const valuePassword = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (confirmPassword !== valuePassword) return;

      await getRegister({
        id,
        fullName: valueFullName,
        userName: valueUserName,
        password: valuePassword,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      return navigate("/login");
    }
  }, [isSuccess]);

  return (
    <main className="flex">
      <img src={Banner} className="w-[40%] object-cover h-screen" />
      <div className="w-full">
        <div className="h-[20%] flex justify-center items-center">
          <h1 className="text-[23px] font-bold Inter">Đăng Ký</h1>
          <img src={Logo} className="h-[40px] w-[197px] ml-[30px]" />
        </div>
        <div className="h-auto items-center block justify-center w-[60%] m-auto space-y-6">
          <div className="w-[60%]">
            <FormInputAuth
              // value={valueFormRegister.userName}
              id="username"
              TextForm={"Tài khoản"}
            />
          </div>
          <div className=" w-[60%]">
            <FormInputAuth
              // value={valueFormRegister.fullName}
              id="fullname"
              TextForm={"Họ Tên"}
            />
          </div>
          <div className="w-[60%]">
            <FormInputAuth
              type="password"
              // value={valueFormRegister.password}
              id="password"
              TextForm={"Mật khẩu"}
            />
          </div>
          <div className="w-[60%]">
            <FormInputAuth
              type="password"
              // value={valueFormRegister.confirmPassword}
              id="confirmPassword"
              TextForm={"Nhập lại mật khẩu"}
            />
          </div>
          <div className="">
            <input type="checkbox" />
            <span className="Inter ml-3">I agree all terms & conditions</span>
          </div>

          <ButtonMediumWeight
            onClick={submit}
            className="color-brown text-slate-200 w-[565px] rounded-2xl"
          >
            Create Account
          </ButtonMediumWeight>
        </div>
      </div>
    </main>
  );
};

export default Register;
