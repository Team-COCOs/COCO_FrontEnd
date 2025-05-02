import { useRouter } from "next/router";
import { StoreStyle } from "./styled";
import clsx from "clsx";
import { useState } from "react";
import Stores from "./Stores";

const TABS = [
  { key: "skin", label: "스킨" },
  { key: "MINIMI", label: "미니미" },
  { key: "MINIROOM", label: "미니룸" },
  { key: "BGM", label: "음악" },
];

const StoreContent = () => {
  const [product, setProduct] = useState("skin");

  return (
    <StoreStyle className={clsx("Store_wrap")}>
      <div className="Store_header">
        <b>선물가게</b>

        <div className="Store_products">
          {TABS.map((tab, idx) => (
            <>
              <p
                className={clsx({ Store_active: product === tab.key })}
                onClick={() => setProduct(tab.key)}
              >
                {tab.label}
              </p>
              {idx !== TABS.length - 1 && <span>|</span>}
            </>
          ))}
        </div>
      </div>

      <div className="Store_line"></div>

      <Stores product={product} />
    </StoreStyle>
  );
};

export default StoreContent;
