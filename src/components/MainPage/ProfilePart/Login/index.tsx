import { LoginStyle } from "./styled";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { catchAxiosError } from "@/utils/catchAxiosError";
import { useDispatch } from "react-redux";
import { setReduxUser } from "@/store/reducers/userSlice";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [saveEmail, setSaveEmail] = useState(false);

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

      if (saveEmail) {
        localStorage.setItem("saveEmail", values.email);
      } else {
        localStorage.removeItem("saveEmail");
      }

      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/localLogin`, data, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }) // 서버 URL
        .then((res) => {
          Cookie.set("accessToken", res.data.access_token, {
            path: "/", // 모든 페이지에서 접근 가능
            expires: 1 / 24, // 1일
          });

          Cookie.set("refreshToken", res.data.refresh_token, {
            path: "/", // 모든 페이지에서 접근 가능
            expires: 1 / 24, // 1일
          });

          console.log("로그인 대답: ", res.data);

          dispatch(setReduxUser(res.data));

          router.push("/");
        })
        .catch(catchAxiosError);
    },
  });

  useEffect(() => {
    const localEmail = localStorage.getItem("saveEmail");
    if (localEmail) {
      formik.setFieldValue("email", localEmail);
      setSaveEmail(true);
    }
  }, []);

  return (
    <LoginStyle className={clsx("Login_wrap")}>
      <form onSubmit={formik.handleSubmit} className="Login_form">
        <div className="Login_inputs">
          <input
            type="text"
            name="email"
            placeholder="이메일"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </div>
        <button type="submit"> &gt; 로그인 </button>
      </form>

      <div className="Login_saveEmail">
        <input
          type="checkbox"
          checked={saveEmail}
          onChange={(e) => setSaveEmail(e.target.checked)}
        />
        <span className="Login_emailFont mainFont">이메일저장</span>
      </div>
      <div className="Loing_line"></div>
      <div className="Login_etc">
        <p
          className="mainColor Login_join"
          onClick={() => router.push("/sign")}
        >
          회원가입
        </p>
        <div className="Login_gray"></div>
        <div className="Login_find">
          <span>이메일</span>
          <span>/비밀번호찾기</span>
        </div>
      </div>
    </LoginStyle>
  );
};

export default Login;
