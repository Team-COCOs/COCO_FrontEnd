import axios from "axios";
import { StoresStyle } from "./styled";
import clsx from "clsx";
import { useEffect, useState } from "react";

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
      <div className="store-grid">
        {currentItems.map((item) => (
          <div key={item.id} className="store-card">
            {item.category === "BGM" ? (
              <>
                <div className="bgm-info">
                  <div className="item-name">
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
                <div className="item-price">도토리 {item.price}개</div>
                <div className="btn-wrap">
                  <button className="mainFont">구입</button>
                </div>
              </>
            ) : (
              <>
                <img src={item.file} alt={item.name} className="item-img" />
                <div className="item-name">
                  {item.name.length > 7
                    ? `${item.name.slice(0, 7)}...`
                    : item.name}
                </div>

                <div className="item-price">도토리 {item.price}개</div>
                <div className="btn-wrap">
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
