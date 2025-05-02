import axios from "axios";
import { StoresStyle } from "./styled";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface StoresProps {
  product: string;
}

const dummyStoreItems = [
  {
    id: 1,
    name: "미니홈피 배경 A",
    file: "/miniroom/miniroom1.jpg",
    price: 5000,
    category: "MINIHOMEPIS",
    artist: "아티스트 A",
    duration: 0,
    created_at: new Date("2025-04-01T00:00:00Z"),
  },
  {
    id: 2,
    name: "다이어리 배경 B",
    file: "/miniroom/miniroom2.jpg",
    price: 3000,
    category: "DIARY_BG",
    artist: "아티스트 B",
    duration: 0,
    created_at: new Date("2025-04-02T00:00:00Z"),
  },
  {
    id: 3,
    name: "탭 컬러 C",
    file: "/miniroom/miniroom3.jpg",
    price: 2000,
    category: "TAPCOLOR",
    artist: "아티스트 C",
    duration: 0,
    created_at: new Date("2025-04-03T00:00:00Z"),
  },
  {
    id: 4,
    name: "미니룸 D",
    file: "/miniroom/miniroom4.jpg",
    price: 8000,
    category: "MINIROOM",
    artist: "아티스트 D",
    duration: 0,
    created_at: new Date("2025-04-04T00:00:00Z"),
  },
  {
    id: 5,
    name: "미니미 E",
    file: "/miniroom/miniroom5.jpg",
    price: 10000,
    category: "MINIMI",
    artist: "아티스트 E",
    duration: 0,
    created_at: new Date("2025-04-05T00:00:00Z"),
  },
  {
    id: 6,
    name: "노래 F",
    file: "/bgm/12-32.mp3",
    price: 15000,
    category: "BGM",
    artist: "아티스트 F",
    duration: 120,
    created_at: new Date("2025-04-06T00:00:00Z"),
  },
];

const Stores = ({ product }: StoresProps) => {
  const [storeProduct, setStoreProduct] = useState([]);

  const categoryParam =
    product === "skin" ? "MINIHOMEPIS,DIARY_BG,TAPCOLOR" : product;

  useEffect(() => {
    const productData = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/storeitems`,
        {
          params: {
            category: categoryParam,
          },
        }
      );

      setStoreProduct(res.data);
    };

    productData();
  }, [product]);

  return <StoresStyle className={clsx("Stores_wrap")}></StoresStyle>;
};

export default Stores;
