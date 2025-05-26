import axios from "axios";
import { StoresStyle } from "./styled";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Image from "next/image";
import CustomAudio from "./CustomAudio";
import axiosInstance from "@/lib/axios";
import Cookies from "js-cookie";
import ShadowModal from "@/components/ShadowModal";
import { useModal } from "@/context/ModalContext";
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
  const [pendingBuyId, setPendingBuyId] = useState<number | null>(null);

  const { type, isOpen, message, openModal, closeModal } = useModal();

  const handleBuyClick = (storeItemId: number) => {
    if (!token) {
      openModal("error", { message: "로그인 후 구매해주세요." });
      return;
    }

    setPendingBuyId(storeItemId);
    openModal("confirm", { message: "정말 구매하시겠습니까?" });
  };

  const confirmBuy = () => {
    if (!pendingBuyId) return;

    axiosInstance
      .post("/purchases", { storeItemId: pendingBuyId })
      .then((res) => {
        if (res.data.message) {
          openModal("error", { message: res.data.message });
          return;
        }

        openModal("success", { message: "구매를 성공했습니다!" });
      })
      .catch((e) => {
        openModal("error", { message: e.response.data.message });
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
          if (type === "success") {
            window.location.reload();
          }
          closeModal();
        }}
        message={message}
        onConfirm={confirmBuy}
      />
    </StoresStyle>
  );
};

export default Stores;
