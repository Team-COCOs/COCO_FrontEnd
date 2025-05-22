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
import { useRouter } from "next/router";
import MiniroomName from "./MiniroomName";

interface MakeMiniroomProps {
  setfixMiniroom: (value: boolean) => void;
}

const MakeMiniroom: React.FC<MakeMiniroomProps> = ({ setfixMiniroom }) => {
  const router = useRouter();
  const { id } = router.query;
  const [allProduct, setAllProduct] = useState<any[]>([]);
  const [buyItemTabs, setBuyItemTabs] = useState<string>("미니룸");
  // 드래그 완료된 위치
  const [draggedData, setDraggedData] = useState<any[]>([]);
  const { user } = useAuth();
  const dropRef = useRef<HTMLDivElement | null>(null);
  // 선택된 제품 상태 관리
  const [selectedMiniroom, setSelectedMiniroom] = useState<any | null>(null);
  const [selectedMinimi, setSelectedMinimi] = useState<any[]>([]);
  const [selectedMiniroomId, setSelectedMiniroomId] = useState<number | null>(
    null
  );
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

  // 미니미, 말풍선 초기 데이터
  const [initialItems, setInitialItems] = useState<any[]>([]);

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

        setAllProduct(response.data);
      } catch (e: any) {
        if (e.response && e.response.status === 401) {
          alert("로그인이 필요합니다.");
          router.push(`/home/${id}`);
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
      setDraggedData((prev) => {
        const existing = prev.find((item) => item.id === product.id);

        // 이미 존재하면 기존 위치 유지
        if (existing) return [...prev];

        // 없으면 기본 위치로 추가
        return [
          ...prev,
          {
            id: product.id,
            text: product.storeItems.name,
            x: 225,
            y: 100,
            store_item_id: product.id,
          },
        ];
      });
    }
  };
  const handleLayoutSave = async () => {
    try {
      const isDefaultMiniroom = selectedMiniroom?.id === defaultMiniroom.id;

      const backgroundPayload = selectedMiniroom
        ? isDefaultMiniroom
          ? "default-miniroom"
          : selectedMiniroom.id
        : "default-miniroom";

      const isBackgroundChanged =
        String(backgroundPayload) !== String(miniroomBackgroundId);

      // 드래그된 미니미 데이터 → 서버에 저장할 형식으로 변환
      const layoutDataFromDragged = draggedData.map((item) => ({
        id: item.id,
        text: item.type !== "speechBubble" ? null : item.text,
        left: item.x,
        top: item.y,
        type: item.type === "speechBubble" ? "speechBubble" : "minimi",
        created_at: new Date().toISOString(),
      }));

      // 드래그하지 않은 미니미를 찾아 기존 좌표로 추가
      const draggedIds = draggedData.map((item) => item.id);
      const untouchedMinimi = selectedMinimi.filter(
        (minimi) => !draggedIds.includes(minimi.id)
      );

      const layoutDataFromUntouched = untouchedMinimi.map((minimi) => {
        const initialItem = initialItems.find((item) => item.id === minimi.id);
        return {
          id: minimi.id,
          text: null,
          left: initialItem?.left || 0,
          top: initialItem?.top || 0,
          type: "minimi",
          created_at: new Date().toISOString(),
        };
      });

      const fullLayoutData = [
        ...layoutDataFromDragged,
        ...layoutDataFromUntouched,
      ];

      // 말풍선이 fullLayoutData에 없으면 추가
      const hasSpeechBubble = fullLayoutData.some(
        (item) => item.type === "speechBubble"
      );

      if (!hasSpeechBubble) {
        const speechBubble = initialItems.find(
          (item) => item.type === "speechBubble"
        );
        if (speechBubble) {
          fullLayoutData.push({
            id: speechBubble.id,
            text: speechBubble.text || "",
            left: speechBubble.left,
            top: speechBubble.top,
            type: "speechBubble",
            created_at: new Date().toISOString(),
          });
        }
      }

      // 저장 요청
      await axiosInstance.post("/minirooms/background", {
        purchaseId: backgroundPayload,
      });

      await axiosInstance.post("/minirooms/save-layout", {
        items: fullLayoutData,
      });

      alert("미니룸 레이아웃이 저장되었습니다!");
      router.push(`/home/${id}`);
    } catch (error: any) {
      if (error.response?.status === 401) {
        alert("로그인이 필요합니다.");
        router.push(`/home/${id}`);
      } else {
        console.error("미니룸 레이아웃 저장 실패:", error.message || error);
        alert("서버와의 연결에 문제가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  // const handleLayoutSave = async () => {
  //   try {
  //     const isDefaultMiniroom = selectedMiniroom?.id === defaultMiniroom.id;

  //     const backgroundPayload = selectedMiniroom
  //       ? isDefaultMiniroom
  //         ? "default-miniroom"
  //         : selectedMiniroom.id
  //       : "default-miniroom";

  //     const isBackgroundChanged =
  //       String(backgroundPayload) !== String(miniroomBackgroundId);

  //     // 레이아웃 저장 여부 체크
  //     const hasLayoutChanged = draggedData.some(
  //       (item) =>
  //         item.x !== item.originalX ||
  //         item.y !== item.originalY ||
  //         item.text !== item.originalText
  //     );
  //     console.log(hasLayoutChanged, "haslayoutchanged?");
  //     // 미니미 데이터로 변경된 레이아웃 만들기
  //     const layoutData = draggedData.map((item) => ({
  //       id: item.id,
  //       text: item.type !== "speechBubble" ? null : item.text, // 'speechBubble'만 텍스트 포함
  //       left: item.x,
  //       top: item.y,
  //       type: item.type === "speechBubble" ? "speechBubble" : "minimi", // 타입에 맞게 구분
  //       created_at: new Date().toISOString(),
  //     }));

  //     console.log(draggedData, "???미니미데이터");

  //     // 배경 저장 (변경 여부와 관계없이 저장)
  //     await axiosInstance.post("/minirooms/background", {
  //       purchaseId: backgroundPayload,
  //     });

  //     // 레이아웃 저장 (변경 여부와 관계없이 저장)
  //     await axiosInstance.post("/minirooms/save-layout", {
  //       items: layoutData,
  //     });

  //     alert("미니룸 레이아웃이 저장되었습니다!");
  //     router.push(`/home/${id}`);
  //   } catch (error: any) {
  //     if (error.response?.status === 401) {
  //       alert("로그인이 필요합니다.");
  //       router.push(`/home/${id}`);
  //     } else {
  //       console.error("미니룸 레이아웃 저장 실패:", error.message || error);
  //       alert("서버와의 연결에 문제가 발생했습니다. 다시 시도해주세요.");
  //     }
  //   }
  // };
  // 미니룸 배경
  useEffect(() => {
    if (!id) return;
    const fetchMiniroomBackground = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/minirooms/${id}/background`
        );

        if (response.data?.id) {
          setSelectedMiniroomId(response.data.id);
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
          setSelectedMiniroomId(null);
          setSelectedMiniroom(defaultMiniroom);
        }
      } catch (e) {
        console.log(e, "미니룸 이미지 e");
        setMiniroomBackgroundId(null);
        setSelectedMiniroomId(null);
        setSelectedMiniroom(defaultMiniroom);
      }
    };

    fetchMiniroomBackground();
  }, [id]);

  return (
    <DndProvider backend={DND_BACKEND} options={backendOptions}>
      <MakeMiniroomStyled>
        <div className="MinimiSet_wrap">
          <div className="MakeMiniroom_titleWrap">
            {/* 미니룸 이름 수정 컴포넌트 */}
            <MiniroomName />

            {/* 수정 미니룸 미리보기 */}
            <div className="MakeMiniroom_fixbox_wrap">
              <DragMiniroom
                selectedMiniroom={selectedMiniroom}
                selectedMinimi={selectedMinimi}
                setSelectedMinimi={setSelectedMinimi}
                onDragComplete={(draggedItems) => setDraggedData(draggedItems)}
                initialItems={initialItems}
                setInitialItems={setInitialItems}
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
                            (item) => String(item.id) === String(product.id)
                          )}
                          onChange={() => handleMinimiSelect(product)}
                        />
                        <img
                          src={product.storeItems.file || null}
                          alt={`minimi ${product.id}`}
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
