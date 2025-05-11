import React, { useRef } from "react";
import { useDrag } from "react-dnd";

// 아이템 타입 정의
interface Product {
  id: string;
  storeItems: {
    file: string;
    name: string;
    category: string;
  };
  top: number;
  left: number;
}

interface MiniroomItemProps {
  item: Product; // 아이템의 타입 정의
}

const MiniroomItem: React.FC<MiniroomItemProps> = ({ item }) => {
  const ref = useRef<HTMLImageElement>(null);
  const [{ isDragging }, drag] = useDrag({
    type: "minimi", // 타입 설정
    item: () => ({
      id: item.id, // 고유 식별자 반드시 포함
      storeItems: item.storeItems,
    }),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  drag(ref);

  const isDefault = item.id === "default-minimi";
  return (
    <img
      ref={ref}
      src={item.storeItems.file}
      alt="minimi"
      style={{
        position: "absolute",
        top: item.top,
        left: item.left,
        width: isDefault ? "fit-content" : 50,
        // width: 50,
        height: 50,
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    />
  );
};

export default MiniroomItem;
