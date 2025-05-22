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
  const [pendingBuyId, setPendingBuyId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const handleBuyClick = (storeItemId: number) => {
    if (!token) {
      setIsOpen(true);
      setType("error");
      setMessage("로그인 후 구매해주세요.");
      return;
    }

    console.log("클릭됨");
    setPendingBuyId(storeItemId);
    setIsOpen(true);
    setType("confirm");
  };

  const confirmBuy = () => {
    if (!pendingBuyId) return;

    axiosInstance
      .post("/purchases", { storeItemId: pendingBuyId })
      .then((res) => {
        console.log("상품 구매 : ", res.data);

        if (res.data.message) {
          setIsOpen(true);
          setType("error");
          setMessage(res.data.message);
          return;
        }

        setIsOpen(true);
        setType("success");
        setMessage("구매를 성공했습니다!");
      })
      .catch((e) => {
        setIsOpen(true);
        setType("error");
        setMessage(e.response.data.message);
      });
  };

  const [playingId, setPlayingId] = useState<number | null>(null);

  const handlePlay = (status: boolean, id: number) => {
    setPlayingId(status ? id : null);
  };

  return (
    <StoresStyle className={clsx("Stores_wrap")}>
      <div className="Stores-grid">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className={clsx("Stores_card", {
              Store_bgmCard: item.category === "bgm",
            })}
          >
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
                    isPlayingGlobal={playingId === item.id}
                    handlePlay={(status) => handlePlay(status, item.id)}
                  />
                </div>
                <div className="Stores_itemPrice">도토리 {item.price}개</div>
                <div className="Stores_btnWrap">
                  <button
                    className="mainFont"
                    onClick={() => handleBuyClick(item.id)}
                  >
                    구입
                  </button>
                </div>
              </>
            ) : (
              <>
                <div
                  className={clsx(
                    "Stores_itemImg",
                    item.category === "minimi" && "Stores_mini",
                    item.category === "minimi" &&
                      item.file.endsWith(".gif") &&
                      "Stores_gif"
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
                    onClick={() => handleBuyClick(item.id)}
                  >
                    구입
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <ShadowModal
        type={type}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          if (type === "success") {
            window.location.href = "/";
          }
        }}
        message={message}
        onConfirm={confirmBuy}
      />
    </StoresStyle>
  );
};

export default Stores;
