import { useRouter } from "next/router";
import { LogoStyle } from "./styled";
import Image from "next/image";

interface LogoProps {
  type: string;
}

const Logo = ({ type }: LogoProps) => {
  const router = useRouter();
  const isSign = type === "sign";

  return (
    <LogoStyle className={isSign ? "Logo_sign" : "Logo_wrap"}>
      {!isSign && (
        <div className="mainFont Logo_topText">코코월드를 시작페이지로</div>
      )}

      <div
        className={isSign ? "Sign_img" : "Logo_img"}
        onClick={() => router.push("/")}
      >
        <Image src="/cocoworld.png" alt="logo" fill />
      </div>

      <p
        className={`logoFont ${isSign ? "Sign_logoFont" : ""}`}
        onClick={() => router.push("/")}
      >
        COCOWORLD
      </p>

      {isSign && <p className="logoFont Sign_font">회원가입</p>}
    </LogoStyle>
  );
};

export default Logo;
