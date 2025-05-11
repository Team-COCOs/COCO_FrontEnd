import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import MiniroomItem from "./MiniroomItem";
import { useRef } from "react";
import SpeechBubble from "./SpeechBubble";
import { DragMiniroomStyled } from "./styled";

interface DragMiniroomProps {
  selectedMiniroom: any | null;
  selectedMinimi: any[];
}

// 말풍선
interface SpeechBubbleItem {
  id: string;
  type: "speechBubble";
  text: string;
  top: number;
  left: number;
}

const DragMiniroom: React.FC<DragMiniroomProps> = ({
  selectedMiniroom,
  selectedMinimi,
}) => {
  const [items, setItems] = useState<any[]>([]);
  const dropRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [{ isOver }, drop] = useDrop({
    accept: ["minimi", "speechBubble"],
    drop: (item: any, monitor) => {
      const offset = monitor.getClientOffset();
      if (!offset) return;

      const containerRect = dropRef.current!.getBoundingClientRect();

      const offsetX = item.offsetX || 25; // fallback: 가운데 정렬
      const offsetY = item.offsetY || 25;

      const newLeft = offset.x - containerRect.left - offsetX;
      const newTop = offset.y - containerRect.top - offsetY;

      const existingItemIndex = items.findIndex(
        (existingItem) => existingItem.id === item.id
      );

      if (existingItemIndex !== -1) {
        setItems((prevItems) => {
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            left: newLeft,
            top: newTop,
          };
          return updatedItems;
        });
      } else {
        setItems((prev) => [
          ...prev,
          {
            ...item,
            left: newLeft,
            top: newTop,
          },
        ]);
      }
    },

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  useEffect(() => {
    if (!dropRef.current) return;

    const container = dropRef.current;
    const { width, height } = container.getBoundingClientRect();

    setItems((prevItems) => {
      const updatedItems = prevItems.filter(
        (item) =>
          item.type === "speechBubble" ||
          selectedMinimi.some((minimi) => minimi.id === item.id)
      );

      const newMinimis = selectedMinimi.filter(
        (minimi) => !updatedItems.some((item) => item.id === minimi.id)
      );

      const newlyAdded = newMinimis.map((minimi, idx) => {
        const itemWidth = 50; // 미니미 가로 크기 (정확한 값으로 교체 가능)
        const itemHeight = 50; // 미니미 세로 크기

        const centerX = width / 2 - itemWidth / 2 + idx * 30;
        const centerY = height / 2 - itemHeight / 2;

        return {
          ...minimi,
          left: centerX,
          top: centerY,
        };
      });

      return [...updatedItems, ...newlyAdded];
    });
  }, [selectedMinimi]);

  // 말풍선
  const addSpeechBubble = () => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now(), // uuid 또는 Date.now() 사용
        type: "speechBubble",
        text: "",
        left: "40%", // % 단위
        top: "40%", // % 단위
      },
    ]);
  };

  return (
    <DragMiniroomStyled>
      <div className="DragMiniroom_allWrap">
        <div
          ref={(node) => {
            drop(node);
            dropRef.current = node;
          }}
          style={{
            width: "100%",
            border: "1px solid #ddd",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* 미니룸 배경 */}
          {selectedMiniroom && (
            <img
              src={selectedMiniroom.storeItems.file}
              alt="miniroom background"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          )}

          {/* 드래그된 미니미 아이템 */}
          {items.map((item) => {
            if (item.type === "speechBubble") {
              return (
                <SpeechBubble
                  key={item.id}
                  item={item}
                  onTextChange={(id, text) => {
                    setItems((prev) =>
                      prev.map((el) => (el.id === id ? { ...el, text } : el))
                    );
                  }}
                  onDelete={(id) => {
                    setItems((prev) => prev.filter((el) => el.id !== id));
                  }}
                />
              );
            } else {
              return <MiniroomItem key={item.id} item={item} />;
            }
          })}

          {/* 최초 선택된 미니미들을 화면 중앙에 배치 */}
          {items.length === 0 &&
            selectedMinimi.map((minimi, idx) => (
              <MiniroomItem
                key={idx}
                item={{
                  ...minimi,
                  left: 50, // % 단위
                  top: 50, // % 단위
                }}
              />
            ))}
        </div>
        <button onClick={addSpeechBubble}>말풍선 추가</button>
      </div>
    </DragMiniroomStyled>
  );
};

export default DragMiniroom;
