import Image from "next/image";
import { AdvertisingStyled } from "./styled";
import { AiOutlineClose } from "react-icons/ai";
import adImg from "@/assets/images/adImg.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Advertising = () => {
  const router = useRouter();

  const [close, setClose] = useState(false);

  useEffect(() => {
    const hideAd = localStorage.getItem("hideAd");
    if (!hideAd || new Date() > new Date(hideAd)) {
      setClose(true);
    }
  }, []);

  const handleClose = () => {
    const now = new Date();
    now.setDate(now.getDate() + 7);
    localStorage.setItem("hideAd", now.toISOString());
    setClose(false);
  };

  if (!close) return null;

  return (
    <AdvertisingStyled>
      <div className="adBox">
        <div className="closeBox">
          <p onClick={handleClose}>일주일 동안 보지 않기</p>
          <AiOutlineClose
            onClick={() => setClose(false)}
            className="closeBtn"
          />
        </div>
        <div className="adImgBox" onClick={() => router.push("/login")}>
          <Image
            className="adImage"
            src={adImg}
            alt="platora advertising image"
          />
        </div>
      </div>
    </AdvertisingStyled>
  );
};

export default Advertising;
