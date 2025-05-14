import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import MiniroomItem from "./MiniroomItem";
import { useRef } from "react";
import SpeechBubble from "./SpeechBubble";
import { DragMiniroomStyled } from "./styled";
import axiosInstance from "@/lib/axios";
import axios from "axios";
import { useRouter } from "next/router";

interface DragMiniroomProps {
  selectedMiniroom: any | null;
  selectedMinimi: any[];
  onDragComplete: (draggedItems: any[]) => void;
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
  onDragComplete,
}) => {
  const { query } = useRouter();
  const { id } = query;

  const [items, setItems] = useState<any[]>([]);
  const dropRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [layoutItems, setLayoutItems] = useState<
    { id: string; type: "minimi" | "miniroom"; x: number; y: number }[]
  >([]);

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
        setItems((prevItems) => [
          ...prevItems,
          {
            id: item.id,
            text: item.text,
            left: newLeft,
            top: newTop,
            store_item_id: item.store_item_id,
          },
        ]);
      }
      console.log(items, "items??");
      //선택된 미니룸 정보도 포함하여 부모에게 전달
      const layoutData = [
        ...items.map((item) => ({
          id: item.id,
          type: item.type,
          x: item.left,
          y: item.top,
        })),
      ];
      console.log(layoutData, "lay1111??");
      selectedMinimi.forEach((minimi) => {
        const alreadyExists = items.some((item) => item.id === minimi.id);
        if (!alreadyExists) {
          layoutData.push({
            id: minimi.id,
            type: "minimi",
            x: 0,
            y: 0,
          });
        }
      });

      console.log(layoutData, "lay222??");
      onDragComplete(
        items.map((item) => {
          const base = {
            id: item.id,
            type: item.type,
            x: item.left,
            y: item.top,
          };

          if (item.type === "speechBubble") {
            return {
              ...base,
              text: item.text || "",
            };
          }

          return base;
        })
      );
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
          type: "minimi",
          left: centerX,
          top: centerY,
        };
      });

      return [...updatedItems, ...newlyAdded];
    });
  }, [selectedMinimi]);

  // 말풍선
  const addSpeechBubble = () => {
    if (!dropRef.current) return;

    const { width, height } = dropRef.current.getBoundingClientRect();

    const speechBubbleWidth = 100;
    const speechBubbleHeight = 50;

    const centerX = width / 2 - speechBubbleWidth / 2;
    const centerY = height / 2 - speechBubbleHeight / 2;

    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "speechBubble",
        text: "",
        left: centerX,
        top: centerY,
      },
    ]);
  };

  // 말풍선 텍스트 변경 시 처리
  const handleTextChange = (id: string, text: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, text } : item))
    );

    // 텍스트 변경 시 부모에게 데이터 전달
    const updatedLayout = items.map((item) => ({
      id: item.id,
      type: item.type,
      x: item.left,
      y: item.top,
      text: item.text || "", // 텍스트도 함께 전달
    }));

    onDragComplete(updatedLayout);
  };

  // 말풍선 삭제 시 처리
  const handleDelete = (id: string) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);

    // 말풍선 삭제 시 부모에게 데이터 전달
    const updatedLayout = updatedItems.map((item) => ({
      id: item.id,
      type: item.type,
      x: item.left,
      y: item.top,
      text: item.text || "",
    }));

    onDragComplete(updatedLayout);
  };
  // 말풍선
  useEffect(() => {
    if (!dropRef.current) return;

    // const { width, height } = dropRef.current.getBoundingClientRect();

    const layoutData = items
      .filter((item) => item.type !== "speechBubble")
      .map((item) => ({
        id: item.id,
        type: item.type,
        x: item.left,
        y: item.top,
      }));

    setLayoutItems(layoutData);
  }, [items]);

  return (
    <DragMiniroomStyled>
      <div className="DragMiniroom_allWrap">
        <div
          ref={(node) => {
            drop(node);
            dropRef.current = node;
          }}
          style={{
            width: 500,
            height: 250,
            border: "1px solid #ddd",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* 미니룸 배경 */}
          {selectedMiniroom && (
            <img
              src={selectedMiniroom.storeItems.file || null}
              alt="miniroom background"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                maxHeight: 260,
              }}
            />
          )}

          {/* 드래그된 미니미 아이템 */}
          {items.map((item) => {
            if (item.type === "speechBubble") {
              return (
                <SpeechBubble
                  key={item.id}
                  item={item}
                  onTextChange={handleTextChange}
                  onDelete={handleDelete}
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
        <div className="DragMiniroom_speechbubble_btnwrap Gulim">
          <button className="pixelFont" onClick={addSpeechBubble}>
            말풍선 추가
          </button>
        </div>
      </div>
    </DragMiniroomStyled>
  );
};

export default DragMiniroom;
