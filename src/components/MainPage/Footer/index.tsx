// import { MainPageStyled } from "./styled";
import clsx from "clsx";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { FooterStyled } from "./styled";

const Footer = () => {
  return <FooterStyled className={clsx("Footer_wrap")}> footer </FooterStyled>;
};

export default Footer;
