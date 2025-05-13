import React, { useRef } from "react";
import { MakeMiniroomStyled } from "./styled";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import DragMiniroom from "./DragMiniroom";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { Router, useRouter } from "next/router";

interface MakeMiniroomProps {
  setfixMiniroom: (value: boolean) => void;
}

const MakeMiniroom: React.FC<MakeMiniroomProps> = ({ setfixMiniroom }) => {
  const { query } = useRouter();
  const { id } = query;
  const [allProduct, setAllProduct] = useState<any[]>([]);
  const [buyItemTabs, setBuyItemTabs] = useState<string>("미니룸");
  // 드래그 완료된 위치
  const [draggedData, setDraggedData] = useState<any[]>([]);
  const { user } = useAuth();
  const dropRef = useRef<HTMLDivElement | null>(null);
  const [minirooms, setMinirooms] = useState<any[]>([]);
  const [minimis, setMinimis] = useState<any[]>([]);
  // 선택된 제품 상태 관리
  const [selectedMiniroom, setSelectedMiniroom] = useState<any | null>(null);
  const [selectedMinimi, setSelectedMinimi] = useState<any[]>([]);
  const [selectedBackgroundId, setSelectedBackgroundId] = useState<
    number | null
  >(null);

  // 미니룸 id 불러오기
  const [miniroomBackgroundId, setMiniroomBackgroundId] = useState<
    number | null
  >(null);

  // 미니룸 이름 관리
  const [name, setName] = useState("");

  // 모바일 여부 확인
  const isMobile = useIsMobile();

  const DND_BACKEND = isMobile ? TouchBackend : HTML5Backend;

  const backendOptions = isMobile ? { enableMouseEvents: true } : undefined;

  if (typeof window === "undefined") return null;

  // 기본 미니미 미니룸
  const defaultMiniroom = {
    id: "default-miniroom",
    storeItems: {
      file: "/miniroom/miniroom17.png",
      name: "기본 미니룸",
    },
  };

  const defaultMinimi = {
    id: "default-minimi",
    storeItems: {
      file:
        user?.gender === "woman"
          ? "/avatarImg/woman_avatar1.png"
          : "/avatarImg/man_avatar1.png",
      name: "기본 미니미",
    },
  };

  useEffect(() => {
    const fetchMinimiData = async () => {
      try {
        const response = await axiosInstance.get(`/purchases`);
        console.log(response.data, "구매 목록?");
        setAllProduct(response.data);
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

  const miniroomProduct = [
    defaultMiniroom,
    ...allProduct.filter(
      (product) => product.storeItems.category === "miniroom"
    ),
  ];

  const minimiProduct = [
    defaultMinimi,
    ...allProduct.filter((product) => product.storeItems.category === "minimi"),
  ];

  const handleMiniroomSelect = (product: any) => {
    setSelectedMiniroom(product);
    setSelectedBackgroundId(product.id);
  };

  const handleMinimiSelect = (product: any) => {
    const isSelected = selectedMinimi.some((item) => item.id === product.id);

    if (isSelected) {
      // 선택 해제: selectedMinimi와 draggedData에서 제거
      setSelectedMinimi((prev) =>
        prev.filter((item) => item.id !== product.id)
      );
      setDraggedData((prev) => prev.filter((item) => item.id !== product.id));
    } else {
      // 선택: selectedMinimi와 draggedData에 추가
      setSelectedMinimi((prev) => [...prev, product]);
      setDraggedData((prev) => [
        ...prev,
        {
          id: product.id,
          text: product.storeItems.name,
          x: 0,
          y: 0,
          store_item_id: product.id,
        },
      ]);
    }
  };
  const handleLayoutSave = async () => {
    try {
      // 기본 미니룸인 경우 null로 처리
      const isDefaultMiniroom = selectedMiniroom?.id === defaultMiniroom.id;
      const backgroundPayload = isDefaultMiniroom ? null : selectedBackgroundId;

      // 배경이 null인 경우에도 비교해서 저장되지 않도록 처리
      const isBackgroundChanged =
        backgroundPayload !== selectedMiniroom?.backgroundId &&
        backgroundPayload !== null;

      // 레이아웃 저장 여부 체크
      const hasLayoutChanged = draggedData.some(
        (item) =>
          item.x !== item.originalX ||
          item.y !== item.originalY ||
          item.text !== item.originalText
      );

      // 배경만 변경된 경우
      if (isBackgroundChanged && !hasLayoutChanged) {
        await axiosInstance.post("/minirooms/background", {
          purchaseId: backgroundPayload,
        });
        console.log(selectedBackgroundId, "selectedBackgroundId?");
        alert("배경이 변경되었습니다.");
        return; // 레이아웃은 변경되지 않아서 저장할 필요 없음
      }

      // 레이아웃이 변경된 경우
      const layoutData = draggedData.map((item) => ({
        id: item.id,
        text: item.type !== "speechBubble" ? null : item.text,
        left: item.x,
        top: item.y,
        type: item.type === "speechBubble" ? "speechBubble" : "minimi",
        created_at: new Date().toISOString(),
      }));

      // 배경 변경과 레이아웃 변경 둘 다 있을 경우
      if (isBackgroundChanged) {
        await axiosInstance.post("/minirooms/background", {
          purchaseId: backgroundPayload,
        });
        console.log(selectedBackgroundId, "selectedBackgroundId?");
      }

      // 레이아웃 저장 요청
      if (hasLayoutChanged) {
        await axiosInstance.post("/minirooms/save-layout", {
          items: layoutData,
        });
        console.log(layoutData, "layoutData?");
      }

      if (!isBackgroundChanged && !hasLayoutChanged) {
        alert("변경된 내용이 없습니다.");
      } else {
        alert("미니룸 레이아웃이 저장되었습니다!");
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        alert("로그인이 필요합니다.");
        window.location.reload();
      } else {
        console.error("미니룸 레이아웃 저장 실패:", error.message || error);
        alert("서버와의 연결에 문제가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  // 미니룸 이름 불러오기
  useEffect(() => {
    if (!id) return;
    const fetchMiniroomName = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/minirooms/${id}/title`
        );
        setName(response.data.title);
      } catch (e: any) {
        console.log(e, "미니룸 이름 e");
      }
    };
    fetchMiniroomName();
  }, [id]);

  // 저장된 미니룸 배경 id 불러오기
  // useEffect(() => {
  //   const fetchMiniroomBackground = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.NEXT_PUBLIC_API_URL}/minirooms/${id}/background`
  //       );
  //       setMiniroomBackgroundId(response.data.id);
  //       setSelectedBackgroundId(response.data.id);
  //     } catch (e: any) {
  //       console.log(e, "미니룸 이미지 e");
  //     }
  //   };
  //   fetchMiniroomBackground();
  // }, [id]);

  useEffect(() => {
    if (!id) return;
    const fetchMiniroomBackground = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/minirooms/${id}/background`
        );

        if (response.data?.id) {
          setMiniroomBackgroundId(response.data.id);
          setSelectedMiniroom({
            id: response.data.id,
            storeItems: {
              file: response.data.file,
              name: response.data.name,
            },
          });
        } else {
          // 배경 없을 경우 기본 미니룸 선택
          setMiniroomBackgroundId(null);
          setSelectedMiniroom(defaultMiniroom);
        }
      } catch (e) {
        console.log(e, "미니룸 이미지 e");
        setMiniroomBackgroundId(null);
        setSelectedMiniroom(defaultMiniroom);
      }
    };

    fetchMiniroomBackground();
  }, [id]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length <= 10) {
      setName(value);
    }
  };

  const handleSave = async () => {
    if (name.length === 0) {
      alert("이름을 입력해주세요.");
    } else {
      const res = await axiosInstance.patch(`/minirooms/title`, { name });

      alert(`미니룸 이름이 변경되었습니다.`);
      window.location.reload();
    }
  };

  return (
    <DndProvider backend={DND_BACKEND} options={backendOptions}>
      <MakeMiniroomStyled>
        <div className="MinimiSet_wrap">
          <div className="MakeMiniroom_titleWrap">
            <div className="MakeMiniroom_wrap_title_fix">
              <div className="MakeMiniroom_wrap_title Gulim">
                <p>
                  미니룸 이름 수정하기 <span>(10자 이내)</span>
                </p>
              </div>
              <div className="MakeMiniroom_namefix_box">
                <input
                  className="MakeMiniroom_namefix_input"
                  value={name === null || name === undefined ? "미니룸" : name}
                  onChange={handleNameChange}
                  maxLength={10}
                ></input>
                <button
                  className="MakeMiniroom_name_saveBtn Gulim"
                  onClick={handleSave}
                >
                  저장
                </button>
              </div>
            </div>
            <div className="MakeMiniroom_wrap_title Gulim">미니룸 수정하기</div>

            {/* 수정 미니룸 미리보기 */}
            <div className="MakeMiniroom_fixbox_wrap">
              <DragMiniroom
                selectedMiniroom={selectedMiniroom}
                selectedMinimi={selectedMinimi}
                onDragComplete={(draggedItems) => setDraggedData(draggedItems)}
              />
            </div>

            {/* 구매한 상품 선택하기 */}
            <div className="MakeMiniroom_fix_buyItems Gulim">
              <div className="MakeMiniroom_buyItems_tabs">
                <div
                  className={`MakeMiniroom_buyItems_miniroomtab ${
                    buyItemTabs === "미니룸" ? "active" : ""
                  }`}
                  onClick={() => setBuyItemTabs("미니룸")}
                >
                  미니룸
                </div>
                <p></p>
                <div
                  className={`MakeMiniroom_buyItems_minimitab ${
                    buyItemTabs === "미니미" ? "active" : ""
                  }`}
                  onClick={() => setBuyItemTabs("미니미")}
                >
                  미니미
                </div>
              </div>
              <div
                className={`MakeMiniroom_buyItems_wrap ${
                  buyItemTabs === "미니미" ? "grid-minimi" : "grid-miniroom"
                }`}
              >
                {buyItemTabs === "미니룸" &&
                  miniroomProduct.map((product, index) => (
                    <div
                      key={product.id}
                      className="MakeMiniroom_productWrap_miniroom"
                    >
                      <div className="MakeMiniroom_product-item pixelFont">
                        {/* <input
                          type="radio"
                          name="miniroom"
                          checked={
                            miniroomBackgroundId
                              ? selectedMiniroom?.id === product.id
                              : product.id === defaultMiniroom.id
                          }
                          onChange={() => handleMiniroomSelect(product)}
                        /> */}
                        <input
                          type="radio"
                          name="miniroom"
                          checked={selectedMiniroom?.id === product.id}
                          onChange={() => handleMiniroomSelect(product)}
                        />
                        <img
                          src={product.storeItems.file || null}
                          alt={`miniroom ${index}`}
                        />
                        <h3>{product.storeItems.name}</h3>
                      </div>
                    </div>
                  ))}

                {buyItemTabs === "미니미" &&
                  minimiProduct.map((product, index) => (
                    <div
                      key={product.id}
                      className="MakeMiniroom_productWrap_minimi"
                    >
                      <div className="MakeMiniroom_product-minimiitem pixelFont">
                        <input
                          type="checkbox"
                          checked={selectedMinimi.some(
                            (item) => item.id === product.id
                          )}
                          onChange={() => handleMinimiSelect(product)}
                        />
                        <img
                          src={product.storeItems.file || null}
                          alt={`minimi ${index}`}
                        />
                        <h3>{product.storeItems.name}</h3>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* 버튼 */}
            <div className="MakeMiniroom_saveBtn_wrap">
              <button
                className="MakeMiniroom_deleteBtn Gulim"
                onClick={() => setfixMiniroom(false)}
              >
                취소
              </button>
              <button
                className="MakeMiniroom_saveBtn Gulim"
                onClick={handleLayoutSave}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      </MakeMiniroomStyled>
    </DndProvider>
  );
};

export default MakeMiniroom;
