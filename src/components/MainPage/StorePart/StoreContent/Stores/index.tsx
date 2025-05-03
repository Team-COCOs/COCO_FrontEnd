import axios from "axios";
import { StoresStyle } from "./styled";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Image from "next/image";

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
  return (
    <StoresStyle className={clsx("Stores_wrap")}>
      <div className="Stores-grid">
        {currentItems.map((item) => (
          <div key={item.id} className="Stores_card">
            {item.category === "BGM" ? (
              <>
                <div className="Stores_bgmInfo">
                  <div className="Stores_itemName">
                    {item.name.length > 7
                      ? `${item.name.slice(0, 7)}...`
                      : item.name}
                  </div>
                  <audio
                    src={item.file}
                    controls
                    preload="auto"
                    controlsList="nodownload noplaybackrate"
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
                  <button className="mainFont">구입</button>
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
