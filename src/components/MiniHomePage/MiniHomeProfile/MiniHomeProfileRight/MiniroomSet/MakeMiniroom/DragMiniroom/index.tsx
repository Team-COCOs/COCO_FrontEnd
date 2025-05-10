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
    accept: "minimi",
    drop: (item: any, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset) {
        // 기존 아이템이 이미 있으면 위치만 업데이트, 없으면 새로 추가
        const existingItemIndex = items.findIndex(
          (existingItem) => existingItem.id === item.id
        );
        if (existingItemIndex !== -1) {
          // 기존 아이템 위치 업데이트
          setItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              left: offset.x - dropRef.current!.getBoundingClientRect().left,
              top: offset.y - dropRef.current!.getBoundingClientRect().top,
            };
            return updatedItems;
          });
        } else {
          // 새 아이템 추가
          setItems((prev) => [
            ...prev,
            {
              ...item,
              left: offset.x - dropRef.current!.getBoundingClientRect().left,
              top: offset.y - dropRef.current!.getBoundingClientRect().top,
            },
          ]);
        }
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  useEffect(() => {
    // selectedMinimi에서 아직 추가되지 않은 항목만 필터링
    const newItems = selectedMinimi.filter(
      (minimi) => !items.some((item) => item.id === minimi.id)
    );

    if (newItems.length > 0) {
      setItems((prev) => [
        ...prev,
        ...newItems.map((minimi, idx) => ({
          ...minimi,
          left: 200 + idx * 30,
          top: 150,
        })),
      ]);
    }
  }, [selectedMinimi]);

  // 말풍선
  const addSpeechBubble = () => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now(), // uuid 또는 Date.now() 사용
        type: "speechBubble",
        text: "말풍선", // 기본 텍스트
        left: 100,
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
