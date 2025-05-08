import axios from "axios";
import { StoresStyle } from "./styled";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Image from "next/image";
import CustomAudio from "./CustomAudio";
import axiosInstance from "@/lib/axios";
import Cookies from "js-cookie";
import ShadowModal from "@/components/ShadowModal";
interface StoreItem {
  id: number;
  name: string;
  file: string;
  price: number;
  category: string;
  artist?: string;
  duration?: number;
  preview_url?: string;
}

interface StoresProps {
  currentItems: StoreItem[];
}

const Stores = ({ currentItems }: StoresProps) => {
  const token = Cookies.get("accessToken");
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const buyItem = (storeItemId: number) => {
    if (!token) {
      setIsOpen(true);
      setMessage("로그인 후 구매해주세요.");
      return;
    }

    axiosInstance
      .post("/purchases", { storeItemId })
      .then((res) => {
        console.log("구매 대답 : ", res.data);
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

  console.log(currentItems);
  console.log(currentItems.map((i) => i.preview_url));

  return (
    <StoresStyle className={clsx("Stores_wrap")}>
      <div className="Stores-grid">
        {currentItems.map((item) => (
          <div key={item.id} className="Stores_card">
            {item.category === "bgm" ? (
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
                    src={item.preview_url!}
                    handlePlay={(status) => handlePlay(status, item.id)}
                  />
                </div>
                <div className="Stores_itemPrice">도토리 {item.price}개</div>
                <div className="Stores_btnWrap">
                  <button className="mainFont" onClick={() => buyItem(item.id)}>
                    구입
                  </button>
                </div>
              </>
            ) : (
              <>
                <div
                  className={clsx(
                    "Stores_itemImg",
                    item.category === "minimi" && "Stores_mini"
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
                  <button className="mainFont" onClick={() => buyItem(item.id)}>
                    구입
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <ShadowModal
        type="error"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message={message}
      />
    </StoresStyle>
  );
};

export default Stores;
