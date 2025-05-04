import axios from "axios";
import { StoresStyle } from "./styled";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Image from "next/image";
import CustomAudio from "./CustomAudio";

interface StoreItem {
  id: number;
  name: string;
  file: string;
  price: number;
  category: string;
  artist?: string;
  duration?: number;
}

interface StoresProps {
  currentItems: StoreItem[];
}

const Stores = ({ currentItems }: StoresProps) => {
  const buyItem = (price: number) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/buyItem`, { price })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log("구매 실패:", e);
      });
  };

  const [playingId, setPlayingId] = useState<number | null>(null);

  // 재생 중인 이미지만 썸네일 돌아가게 해야 함
  const handlePlay = (status: boolean, id: number) => {
    setPlayingId(status ? id : null);
  };

  return (
    <StoresStyle className={clsx("Stores_wrap")}>
      <div className="Stores-grid">
        {currentItems.map((item) => (
          <div key={item.id} className="Stores_card">
            {item.category === "BGM" ? (
              <>
                <div className="Stores_bgmInfo">
                  <div
                    className={clsx("Stores_thumbnai", {
                      playing: playingId === item.id,
                    })}
                  >
                    <Image
                      src="/bgm/lp.png"
                      alt="thumbnai image"
                      width={90}
                      height={90}
                    />
                  </div>
                  <div className="Stores_itemName">
                    {item.name.length > 7
                      ? `${item.name.slice(0, 7)}...`
                      : item.name}
                  </div>
                  <CustomAudio
                    src={item.file}
                    handlePlay={(status) => handlePlay(status, item.id)}
                  />
                </div>
                <div className="Stores_itemPrice">도토리 {item.price}개</div>
                <div className="Stores_btnWrap">
                  <button className="mainFont">구입</button>
                </div>
              </>
            ) : (
              <>
                <div
                  className={clsx(
                    "Stores_itemImg",
                    item.category === "MINIMI" && "Stores_mini"
                  )}
                >
                  <Image src={item.file} alt={item.name} fill />
                </div>
                <div className="Stores_itemName">
                  {item.name.length > 7
                    ? `${item.name.slice(0, 7)}...`
                    : item.name}
                </div>

                <div className="Stores_itemPrice">도토리 {item.price}개</div>
                <div className="Stores_btnWrap">
                  <button
                    className="mainFont"
                    onClick={() => buyItem(item.price)}
                  >
                    구입
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </StoresStyle>
  );
};

export default Stores;
