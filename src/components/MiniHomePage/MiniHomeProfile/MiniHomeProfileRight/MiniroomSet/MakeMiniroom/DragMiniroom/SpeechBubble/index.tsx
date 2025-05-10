import { useState, useRef } from "react";
import { useDrag } from "react-dnd";

export interface SpeechBubbleItem {
  id: string;
  type: "speechBubble";
  text: string;
  top: number;
  left: number;
}

interface SpeechBubbleItemProps {
  item: SpeechBubbleItem;
  onTextChange: (id: string, text: string) => void;
}

const SpeechBubble: React.FC<SpeechBubbleItemProps> = ({
  item,
  onTextChange,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag({
    type: "speechBubble",
    item: () => item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  drag(ref);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: item.top,
        left: item.left,
        background: "#fff",
        border: "1px solid #ccc",
        borderRadius: 10,
        padding: "5px 10px",
        fontSize: 14,
        maxWidth: 150,
        cursor: "move",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <input
        type="text"
        value={item.text}
        onChange={(e) =>
          e.target.value.length <= 15 && onTextChange(item.id, e.target.value)
        }
        style={{
          border: "none",
          background: "transparent",
          outline: "none",
          width: "100%",
        }}
      />
    </div>
  );
};

export default SpeechBubble;
