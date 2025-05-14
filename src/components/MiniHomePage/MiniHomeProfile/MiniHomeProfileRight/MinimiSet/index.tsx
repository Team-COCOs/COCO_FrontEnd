// MinimiSet.tsx
import React from "react";
import { MinimiSetStyled } from "./styled";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/router";

const MinimiSet = () => {
  const { user } = useAuth();
  const [minimiData, setMinimiData] = useState<any[]>([]);
  const [selectedMinimiId, setSelectedMinimiId] = useState<string>("default");
  const [myMinimi, setMyMinimi] = useState<string>("");
  const { query } = useRouter();
  const { id } = query;

  useEffect(() => {
    const fetchMinimiData = async () => {
      try {
        const response = await axiosInstance.get(`/purchases`);
        setMinimiData(response.data);
      } catch (e: any) {
        if (e.response && e.response.status === 401) {
          alert("로그인이 필요합니다.");
          window.location.reload();
        } else {
          console.log(e, "구매 목록 불러오기 실패");
        }
      }
    };
    fetchMinimiData();
  }, []);

  const onlyMinimi = minimiData.filter(
    (x) => x.storeItems.category === "minimi"
  );

  const handleChange = async (id: string) => {
    setSelectedMinimiId(id);
  };

  const handleSave = async () => {
    const purchaseId =
      selectedMinimiId === "default" ? "default-minimi" : selectedMinimiId;
    try {
      await axiosInstance.patch("/useritems/set-minimi", {
        purchaseId,
      });
      alert("대표 미니미가 저장되었습니다!");
      window.location.reload();
    } catch (error: any) {
      if (error?.response?.status === 401) {
        alert("로그인이 필요합니다.");
        window.location.reload();
      }
      console.error("대표 미니미 저장 실패", error);
      alert("대표 미니미 저장에 실패했습니다.");
    }
  };

  const fetchMyMinimi = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/useritems/minimi/profile-image/${id}`
      );
      setMyMinimi(data.file || "");
      console.log(data.file, "data.file,?");
    } catch (e: any) {
      console.log(e, "대표미니미 e");
      setMyMinimi("default");
    }
  };

  useEffect(() => {
    fetchMyMinimi();
  }, []);

  return (
    <MinimiSetStyled>
      <div className="MinimiSet_wrap">
        <div className="MinimiSet_titleWrap">
          <span className="MinimiSet_wrap_title Gulim">미니미 설정하기</span>
          <span className="MinimiSet_wrap_title2 Gulim">
            대표 미니미를 설정해보세요~!
          </span>
        </div>
        <div className="MinimiSet_now_minimi">
          <span className="MinimiSet_blue_title Gulim">🔸현재 대표 미니미</span>
          <div>
            <div className="MinimiSet_minimi_imgWrap nowminimi">
              <img
                src={
                  myMinimi
                    ? myMinimi
                    : user?.gender === "woman"
                    ? "/avatarImg/woman_avatar1.png"
                    : "/avatarImg/man_avatar1.png"
                }
                alt={"first_minimi"}
              />
            </div>
          </div>
        </div>
        {/* 대표 이미지 선택 */}{" "}
        <span className="MinimiSet_blue_title Gulim">
          🔸대표 미니미 선택하기
        </span>
        <div className="MinimiSet_purchase">
          <div className="MinimiSet_choice_wrap">
            <input
              type="radio"
              name="minimi"
              checked={(selectedMinimiId ?? myMinimi) === "default"}
              onChange={() => handleChange("default")}
            />
            <div className="MinimiSet_minimi_imgWrap">
              <img
                src={
                  user?.gender === "woman"
                    ? "/avatarImg/woman_avatar1.png"
                    : "/avatarImg/man_avatar1.png"
                }
                alt={"first_minimi"}
              />
            </div>
            <div className="MinimiSet_minimi_name">기본 미니미</div>
          </div>
          {onlyMinimi.map((minimi, index) => (
            <div key={minimi.id} className="MinimiSet_choice_wrap">
              <input
                type="radio"
                name="minimi"
                checked={selectedMinimiId === minimi.id}
                onChange={() => handleChange(minimi.id)}
              />
              <div className="MinimiSet_minimi_imgWrap">
                <img
                  src={minimi.storeItems.file}
                  alt={`미니미 ID: ${minimi.id}`}
                />
              </div>
              <div className="MinimiSet_minimi_name">
                {minimi.storeItems.name}
              </div>
            </div>
          ))}
        </div>
        <div className="MinimiSet_saveBtn_wrap">
          <button onClick={handleSave} className="MinimiSet_saveBtn Gulim">
            저장
          </button>
        </div>
      </div>
    </MinimiSetStyled>
  );
};

export default MinimiSet;
