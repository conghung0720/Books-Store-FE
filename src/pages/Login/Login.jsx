import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import ButtonMediumWeight from "../../components/Button/ButtonMediumWeight";
import Banner from "../../img/login_background.png";
import LogoGoogle from "../../img/logoGoogle.png";
import Logo from "../../img/logo.png";
import axios from "axios";
import ConnectToService from "./components/ConnectToService";
import FormInputLogin from "./components/FormInputLogin";
import { Link, useNavigate } from "react-router-dom";
import { useGetLoginMutation } from "../../api/api";
import Cookies from "js-cookie";

const Login = () => {
  const [getLogin] = useGetLoginMutation();
  const [valueInputForm, setValueInputForm] = useState({
    userName: "",
    password: "",
  });
  const [useCookies, setUseCookies] = useState();
  const navigate = useNavigate();

  const submitValue = async () => {
    await axios
      .post("http://localhost:8080/auth/login", {
        userName: valueInputForm.userName,
        password: valueInputForm.password,
      })
      .then((res) => {
        localStorage.setItem("jwt", res.data.access_token);
        window.location.href = "/";
      })
      .catch((err) => console.log(err));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setValueInputForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    const cookieValue = document.cookie;
    if (localStorage.getItem("jwt")) navigate("/");
  }, []);

  return (
    <>
      <main className="flex ">
        <img src={Banner} className="w-[55%] h-screen" />
        <div className=" w-full py-[6%] text-[23px] font-bold">
          <div className="block items-center text-center m-auto italic">
            <h1 className="">SIGN UP</h1>
            <img src={Logo} className="h-[30px] w-[110px] m-auto" />
          </div>
          <div className="w-[60%] m-auto">
            <div className="w-full h-[10%] flex">
              <ConnectToService
                LogoConnect={LogoGoogle}
                connectTo={"Connect to google"}
              />
            </div>
            <div className="h-[50%]">
              <label className="flex-block text-[14px] font-medium inter">
                Tên đăng nhập
              </label>
              <input
                onChange={handleInputChange}
                id="userName"
                TextForm={"Tên đăng nhập"}
                name="userName"
                // value={valueInputForm.userName}
                className="rouned-lg h-[45px] w-[565px] text-[14px] font-medium color-input-login focus:outline-none px-[5%] "
              />
              <label className="flex-block text-[14px] font-medium inter border-2">
                Mật khẩu
              </label>
              <input
                onChange={handleInputChange}
                minLength={"6"}
                min={6}
                max={50}
                id="password"
                type="password"
                name="password"
                TextForm={"Password"}
                // value={valueInputForm.password}
                className="rouned-lg h-[45px] w-[565px] text-[14px] font-medium color-input-login focus:outline-none px-[5%] "
              />

              <div className="py-[10%]">
                <ButtonMediumWeight
                  onClick={submitValue}
                  className="color-brown text-slate-200  w-[565px] rounded-2xl"
                >
                  Sign In
                </ButtonMediumWeight>
                <p className="text-center py-[4%] text-[16px]">or</p>
                <Link to="/register">
                  <ButtonMediumWeight className="color-brown text-slate-200 w-[565px] rounded-2xl">
                    Sign Up
                  </ButtonMediumWeight>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Login;
