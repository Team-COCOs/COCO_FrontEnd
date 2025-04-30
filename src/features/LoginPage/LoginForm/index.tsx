import { LoginFormStyled } from "./styled";
import { useFormik } from "formik";
import axios from "axios";
import { Router, useRouter } from "next/router";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { request } from "http";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import Image from "next/image";
import seeimg from "@/assets/images/pwsee.png";
import notsee from "@/assets/images/notsee.png";
import seeImgBlack from "@/assets/images/seeImgBlack.png";
import notseeBlack from "@/assets/images/notseeImgBlack.png";
const LoginForm = () => {
  const [see, setSee] = useState("password");
  const router = useRouter();
  const dispatch = useDispatch();

  const seepw = () => {
    if (see === "password") {
      setSee("text");
    } else {
      setSee("password");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      const data = {
        email: values.email,
        password: values.password,
      };

      axios
        .post("http://15.164.52.122/auth/login", data, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json", // 반드시 명시
          },
        }) // 서버 URL
        .then((res) => {
          //   dispatch(setUserToken(res.data.token));
          Cookie.set("accessToken", res.data.token, {
            path: "/", // 모든 페이지에서 접근 가능
            expires: 1, // 1일
          });
          router.push("/");
        })
        .catch((error) => {
          //   Modal.error({
          //     content: `${error.response.data.message}`,
          //   });
        });
    },
  });
  return (
    <LoginFormStyled className={clsx("loginForm-wrap")}>
      <div className="loginForm-container1">
        <form className="loginForm-form" onSubmit={formik.handleSubmit}>
          <div className="loginForm-idDiv">
            <input
              type="email"
              id="email"
              onChange={formik.handleChange}
              placeholder="abc123@xxx.com"
              required
            />
          </div>
          <div className="loginForm-idDiv">
            <input
              name="password"
              placeholder="비밀번호를 입력해주세요"
              type={see}
              onChange={formik.handleChange}
              required
            />
            <div className="loginForm-seePw" onClick={seepw}>
              <Image src={notseeBlack} alt="pwsee" width={20} />
            </div>
          </div>
          <div className="loginForm-findDiv">
            <span
              onClick={() => {
                router.push("/find/id");
              }}
            >
              id찾기
            </span>
            /
            <span
              onClick={() => {
                router.push("/find/pw");
              }}
            >
              pw찾기
            </span>
            /
            <span
              onClick={() => {
                router.push("/join");
              }}
            >
              회원가입
            </span>
          </div>
          <button className="loginBtn">로그인</button>
        </form>
      </div>
    </LoginFormStyled>
  );
};

export default LoginForm;
