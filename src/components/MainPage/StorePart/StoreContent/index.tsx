import { useRouter } from "next/router";
import { StoreStyle } from "./styled";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Stores from "./Stores";
import axios from "axios";
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
  { key: "MINIMI", label: "미니미" },
  { key: "MINIROOM", label: "미니룸" },
  { key: "BGM", label: "음악" },
];

const StoreContent = () => {
  const [product, setProduct] = useState("skin");
  const [currentPage, setCurrentPage] = useState(1);
  const [storeProduct, setStoreProduct] = useState<StoreItem[]>([]);

  const ITEMS_PER_PAGE = 8;

  const dummyStoreItems: StoreItem[] = [
    {
      id: 1,
      name: "알록달록 꽃밭",
      file: "/miniroom/miniroom1.jpg",
      price: 80,
      category: "MINIHOMEPIS",
    },
    {
      id: 2,
      name: "하트쿠션 클럽",
      file: "/miniroom/miniroom2.jpg",
      price: 80,
      category: "MINIHOMEPIS",
    },
    {
      id: 3,
      name: "찾았다! 네잎클로버!",
      file: "/miniroom/miniroom3.jpg",
      price: 80,
      category: "MINIHOMEPIS",
    },
    {
      id: 4,
      name: "술이나 한잔",
      file: "/miniroom/miniroom4.jpg",
      price: 50,
      category: "MINIHOMEPIS",
    },
    {
      id: 5,
      name: "추가 아이템",
      file: "/miniroom/miniroom5.jpg",
      price: 100,
      category: "MINIHOMEPIS",
    },
    {
      id: 6,
      name: "찾았다! 네잎클로버!",
      file: "/miniroom/miniroom3.jpg",
      price: 80,
      category: "MINIHOMEPIS",
    },
    {
      id: 7,
      name: "술이나 한잔",
      file: "/miniroom/miniroom4.jpg",
      price: 50,
      category: "MINIHOMEPIS",
    },
    {
      id: 8,
      name: "추가 아이템",
      file: "/miniroom/miniroom5.jpg",
      price: 100,
      category: "MINIHOMEPIS",
    },
    {
      id: 9,
      name: "술이나 한자아안",
      file: "/miniroom/miniroom4.jpg",
      price: 50,
      category: "MINIHOMEPIS",
    },
    {
      id: 10,
      name: "추가 아이템입니다",
      file: "/miniroom/miniroom5.jpg",
      price: 100,
      category: "MINIHOMEPIS",
    },
    {
      id: 6,
      name: "노래 F",
      file: "/bgm/12-32.mp3",
      price: 15000,
      category: "BGM",
      artist: "아티스트 F",
      duration: 120,
    },
  ];

  useEffect(() => {
    let categories: string[] = [];

    if (product === "skin") {
      categories = ["MINIHOMEPIS", "DIARY_BG", "TAPCOLOR"];
    } else {
      categories = [product.toUpperCase()];
    }

    const filteredItems = dummyStoreItems.filter((item) =>
      categories.includes(item.category)
    );

    setStoreProduct(filteredItems);
  }, [product]);

  const categoryParam =
    product === "skin" ? "MINIHOMEPIS,DIARY_BG,TAPCOLOR" : product;

  // useEffect(() => {
  //   const productData = async () => {
  //     try {
  //       // file 음악은 10초로 잘라서 보내주세요!
  //       const res = await axios.get(
  //         `${process.env.NEXT_PUBLIC_API_URL}/storeitems`,
  //         {
  //           params: {
  //             category: categoryParam,
  //           },
  //         }
  //       );

  //       let categories: string[] = [];

  //       if (product === "skin") {
  //         categories = ["MINIHOMEPIS", "DIARY_BG", "TAPCOLOR"];
  //       } else {
  //         categories = [product];
  //       }

  //       console.log("상품 데이터 대답 : ", res.data);

  //       const filteredItems = res.data.filter((item: StoreItem) => {
  //         console.log("상품 카테고리 : ", item.category);
  //         return categories.includes(item.category);
  //       });

  //       console.log("필터링된 상품 : ", filteredItems);
  //       setStoreProduct(filteredItems);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   productData();
  // }, [product]);

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

      <Stores currentItems={currentItems} />
    </StoreStyle>
  );
};

export default StoreContent;
