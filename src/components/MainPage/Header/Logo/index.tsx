import { useRouter } from "next/router";
import { LogoStyle } from "./styled";
import Image from "next/image";

interface LogoProps {
  type: string;
}

const Logo = ({ type }: LogoProps) => {
  const router = useRouter();
  const isHeader = type === "header";
  const isSign = type === "sign";
  const isFind = type === "find";

  return (
    <LogoStyle className={!isHeader ? "Logo_sign" : "Logo_wrap"}>
      {isHeader && (
        <div className="mainFont Logo_topText">지금 가입하면 도토리 지급!</div>
      )}

      <div
        className={!isHeader ? "Sign_img" : "Logo_img"}
        onClick={() => window.location.reload()}
      >
        <Image src="/cocoworld.png" alt="logo" fill />
      </div>

      <p
        className={`logoFont ${!isHeader ? "Sign_logoFont" : ""}`}
        onClick={() => window.location.reload()}
      >
        COCOWORLD
      </p>

      {isSign && <p className="logoFont Sign_font">회원가입</p>}
      {isFind && <p className="logoFont Sign_font">계정 찾기</p>}
    </LogoStyle>
  );
};

export default Logo;
