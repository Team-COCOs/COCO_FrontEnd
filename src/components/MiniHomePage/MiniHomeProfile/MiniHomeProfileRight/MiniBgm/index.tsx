import { useAuth } from "@/context/AuthContext";
import { MiniBgmStyle } from "./styled";
import Image from "next/image";

const MiniBgm = () => {
  const { user } = useAuth();

  return (
    <MiniBgmStyle className="MiniBgm_wrap">
      <span className="MiniBgm_title Gulim">내 상태 관리하기</span>
    </MiniBgmStyle>
  );
};

export default MiniBgm;
