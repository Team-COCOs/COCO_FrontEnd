import clsx from "clsx";
import { AdvertisingStyle } from "./styled";
import Image from "next/image";
import { useRouter } from "next/router";

type AdvertisingProps = {
  type: string;
};

const Advertising = ({ type }: AdvertisingProps) => {
  const borderAd = type === "Advertising4";

  return (
    <AdvertisingStyle className={clsx("Advertising_wrap")}>
      {/* 특정 광고만 클래스 추가 */}
      <div className={clsx(borderAd && "Advertising_border")}>
        <div className={type}>
          <Image src={`/advertising/${type}.jpg`} alt={type} fill />
        </div>

        {borderAd && (
          <div className="Advertising_text">
            <p className="mainFont">이것만 알아도 해외여행 간다!</p>
            <p className="mainFont Advertising_font">
              별자리로 알아보는 오늘의 운세
            </p>
          </div>
        )}
      </div>
    </AdvertisingStyle>
  );
};

export default Advertising;
