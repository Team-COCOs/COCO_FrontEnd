import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import MiniroomItem from "./MiniroomItem";
import { useRef } from "react";
import SpeechBubble from "./SpeechBubble";

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
    setItems((prevItems) => {
      // selectedMinimi에 포함되지 않은 minimi는 제거 (말풍선은 유지)
      const updatedItems = prevItems.filter(
        (item) =>
          item.type === "speechBubble" ||
          selectedMinimi.some((minimi) => minimi.id === item.id)
      );

      // 새로 추가된 미니미를 찾아서 중앙에 배치
      const newMinimis = selectedMinimi.filter(
        (minimi) => !updatedItems.some((item) => item.id === minimi.id)
      );

      const newlyAdded = newMinimis.map((minimi, idx) => ({
        ...minimi,
        left: 200 + idx * 30,
        top: 150,
      }));

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
        left: "40%",
        top: 100,
      },
    ]);
  };

  return (
    <>
      <div
        ref={(node) => {
          drop(node);
          dropRef.current = node;
        }}
        style={{
          width: "100%",
          minHeight: 300,
          border: "2px solid #ccc",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 미니룸 배경 */}
        {selectedMiniroom && (
          <img
            src={selectedMiniroom.storeItems.file}
            alt="miniroom background"
            style={{ width: "100%", height: "100%", position: "absolute" }}
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
                left: 200 + idx * 30,
                top: 150,
              }}
            />
          ))}
      </div>
      <button onClick={addSpeechBubble}>말풍선 추가</button>
    </>
  );
};

export default DragMiniroom;
