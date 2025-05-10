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
    item: () => item, // 드래그 아이템 설정
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <img
      ref={ref} // drag ref로 HTMLImageElement 타입 지정
      src={item.storeItems.file}
      alt="minimi"
      style={{
        position: "absolute",
        top: item.top,
        left: item.left,
        width: 50,
        height: 50,
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    />
  );
};

export default MiniroomItem;
