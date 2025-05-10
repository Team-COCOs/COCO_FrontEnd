// MinimiSet.tsx
import React from "react";
import { MinimiSetStyled } from "./styled";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

const MinimiSet = () => {
  const [minimiData, setMinimiData] = useState<any[]>([]);

  useEffect(() => {
    const fetchMinimiData = async () => {
      try {
        const response = await axiosInstance.get(`/purchases`);
        console.log(response.data, "구매 목록?");
        setMinimiData(response.data);
      } catch (e) {
        console.log(e, "구매 목록 불러오기 실패");
      }
    };
    fetchMinimiData();
  }, []);

  const onlyMinimi = minimiData.filter(
    (x) => x.storeItems.category === "minimi"
  );
  console.log(onlyMinimi, "only");
  return (
    <MinimiSetStyled>
      <div className="MinimiSet_wrap">
        <span>대표 미니미 설정하기</span>
        <div className="MinimiSet_purchase">
          {onlyMinimi.map((minimi, index) => (
            <div key={minimi.id}>
              <div className="MinimiSet_minimi_imgWrap">
                <img
                  src={minimi.storeItems.file}
                  alt={`미니미 ID: ${minimi.id}`}
                />
              </div>
              <div>{minimi.storeItems.name}</div>
            </div>
          ))}
        </div>
      </div>
    </MinimiSetStyled>
  );
};

export default MinimiSet;
