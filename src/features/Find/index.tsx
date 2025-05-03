import clsx from "clsx";
import { FindStyle } from "./styled";
import Logo from "@/components/MainPage/Header/Logo";
import { useFormik } from "formik";
import axios from "axios";
import IdFind from "./IdFind";
import PwFind from "./PwFind";

const Find = () => {
  return (
    <FindStyle className={clsx("Find_wrap")}>
      <Logo type="find" />
      <b className="Find_text">이메일 / 비밀번호 찾기</b>
      <div className="Find_line"></div>

      <div className="Find_compros">
        <IdFind />
        <div className="Find_centerLine"></div>
        <PwFind />
      </div>
    </FindStyle>
  );
};

export default Find;
