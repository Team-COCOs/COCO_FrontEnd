import { useRouter } from "next/router";
import { LogoStyle } from "./styled";
import Image from "next/image";

interface LogoProps {
  type: string;
}

const Logo = ({ type }: LogoProps) => {
  const router = useRouter();

  return (
    <LogoStyle className={`Logo_wrap ${type === "sign" ? "Logo_sign" : ""}`}>
      <div className="mainFont Logo_topText" onClick={() => router.push("/")}>
        코코월드를 시작페이지로
      </div>
      <div className={type === "sign" ? "Sign_img" : "Logo_img"}>
        <Image src="/cocoworld.png" alt="logo" fill />
      </div>
      <p className={type === "sign" ? "Sign_logoFont" : "logoFont"}>
        COCOWORLD
      </p>
    </LogoStyle>
  );
};

export default Logo;
