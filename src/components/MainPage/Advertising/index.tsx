import clsx from "clsx";
import { AdvertisingStyle } from "./styled";
import Image from "next/image";
import Skeleton from "@mui/material/Skeleton";
import { useState } from "react";

type AdvertisingProps = {
  type: string;
};

const Advertising = ({ type }: AdvertisingProps) => {
  const borderAd = type === "Advertising4";
  const [loaded, setLoaded] = useState(false);

  return (
    <AdvertisingStyle className={clsx("Advertising_wrap")}>
      {/* 특정 광고만 클래스 추가 */}
      <div className={clsx(borderAd && "Advertising_border")}>
        <div className={type}>
          {!loaded && (
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              sx={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
            />
          )}
          <Image
            src={`/advertising/${type}.jpg`}
            alt={type}
            fill
            onLoad={() => setLoaded(true)}
          />
        </div>

        {borderAd && (
          <div className="Advertising_text">
            <p>이것만 알아도 해외여행 간다!</p>
            <p className="Advertising_font">별자리로 알아보는 오늘의 운세</p>
          </div>
        )}
      </div>
    </AdvertisingStyle>
  );
};

export default Advertising;
