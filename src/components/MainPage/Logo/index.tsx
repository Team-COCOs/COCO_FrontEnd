import clsx from "clsx";
import { LogoStyle } from "./styled";
import Image from "next/image";

const Header = () => {
  return (
    <LogoStyle className={clsx("Logo_wrap")}>
      <div className="mainFont Logo_topText">코코월드를 시작페이지로</div>
      <div className="Logo_img">
        <Image src="/cocoworld.png" alt="logo" fill />
      </div>
      <p className="logoFont">COCOWORLD</p>
    </LogoStyle>
  );
};

export default Header;
