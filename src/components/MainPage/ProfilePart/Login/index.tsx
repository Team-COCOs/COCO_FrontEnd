import { LoginStyle } from "./styled";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setReduxUser } from "@/store/reducers/userSlice";
import ShadowModal from "@/components/ShadowModal";
import { useModal } from "@/context/ModalContext";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [saveEmail, setSaveEmail] = useState(false);

  const { type, isOpen, message, openModal, closeModal } = useModal();

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
          if (res.data.message) {
            openModal("error", { message: res.data.message });
            return;
          }

          Cookie.set("accessToken", res.data.access_token, {
            path: "/", // 모든 페이지에서 접근 가능
            expires: 1,
          });

          Cookie.set("refreshToken", res.data.refresh_token, {
            path: "/",
            expires: 1,
          });

          dispatch(setReduxUser(res.data));

          window.location.href = "/";
        })
        .catch((e) => {
          openModal("error", { message: e.response.data.message });
        });
    },
  });

  useEffect(() => {
    const localEmail = localStorage.getItem("saveEmail");
    if (localEmail) {
      formik.setFieldValue("email", localEmail);
      setSaveEmail(true);
    }
  }, []);

  const handleTestLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          email: "cocoworld@cocoworld.com",
          password: "coco1234!!",
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Cookie.set("accessToken", response.data.access_token, {
        path: "/",
        expires: 1,
      });

      Cookie.set("refreshToken", response.data.refresh_token, {
        path: "/",
        expires: 1,
      });

      dispatch(setReduxUser(response.data));
      window.location.href = "/";
    } catch (e: any) {
      console.log(e);
      console.error("❌ 테스트 로그인 에러:", e.response?.data || e.message);
    }
  };

  return (
    <LoginStyle className={clsx("Login_wrap")}>
      <form onSubmit={formik.handleSubmit} className="Login_form">
        <div className="Login_inputs">
          <input
            type="text"
            name="email"
            placeholder="coco123@cocoworld.com"
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
        <span onClick={handleTestLogin} className="Login_testBtn mainFont">
          테스트 계정 로그인
        </span>
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
          <span onClick={() => router.push("/find")}>
            이메일 / 비밀번호찾기
          </span>
        </div>
      </div>

      <ShadowModal
        type={type}
        isOpen={isOpen}
        onClose={closeModal}
        message={message}
      />
    </LoginStyle>
  );
};

export default Login;
