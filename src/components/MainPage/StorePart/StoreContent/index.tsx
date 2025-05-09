import { useRouter } from "next/router";
import { StoreStyle } from "./styled";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import Stores from "./Stores";
import { fetchStoreItems } from "@/store/reducers/storeItemSlice";
import EmptyPage from "@/components/EmptyPage";

interface StoreItem {
  id: number;
  name: string;
  file: string;
  price: number;
  category: string;
  artist?: string;
  duration?: number;
}

const TABS = [
  { key: "skin", label: "스킨" },
  { key: "minimi", label: "미니미" },
  { key: "miniroom", label: "미니룸" },
  { key: "bgm", label: "음악" },
];

const StoreContent = () => {
  const [product, setProduct] = useState("skin");
  const [currentPage, setCurrentPage] = useState(1);
  const [storeProduct, setStoreProduct] = useState<StoreItem[]>([]);

  // Redux 상태에서 데이터 가져오기
  const storeItems = useSelector((state: RootState) => state.storeItems.items);

  const ITEMS_PER_PAGE = 8;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (product === "skin") {
      dispatch(fetchStoreItems());
    } else {
      dispatch(fetchStoreItems(product));
    }
  }, [product, dispatch]);

  useEffect(() => {
    // 카테고리 기반으로 필터링
    let categories: string[] = [];

    if (product === "skin") {
      categories = ["tapcolor", "minihomepis", "diary_background"];
    } else {
      categories = [product];
    }

    const filteredItems = storeItems.filter((item: StoreItem) =>
      categories.includes(item.category)
    );

    setStoreProduct(filteredItems);
  }, [product, storeItems]);

  // 총 페이지
  const totalPages = Math.ceil(storeProduct.length / ITEMS_PER_PAGE);

  // 페이지에 맞게 아이템 자르기
  const currentItems = storeProduct.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <StoreStyle className={clsx("Store_wrap")}>
      <div className="Store_header">
        <b>선물가게</b>

        <div className="Store_products">
          {TABS.map((tab, idx) => (
            <div className="Store_tap" key={tab.key}>
              <p
                className={clsx({ Store_active: product === tab.key })}
                onClick={() => setProduct(tab.key)}
              >
                {tab.label}
              </p>
              {idx !== TABS.length - 1 && <span>|</span>}
            </div>
          ))}

          <div className="Store_pagination">
            <button onClick={handlePrev} disabled={currentPage === 1}>
              &lt;
            </button>

            <button onClick={handleNext} disabled={currentPage === totalPages}>
              &gt;
            </button>
          </div>
        </div>
      </div>

      <div className="Store_line"></div>

      {currentItems.length === 0 ? (
        <EmptyPage />
      ) : (
        <Stores currentItems={currentItems} />
      )}
    </StoreStyle>
  );
};

export default StoreContent;
