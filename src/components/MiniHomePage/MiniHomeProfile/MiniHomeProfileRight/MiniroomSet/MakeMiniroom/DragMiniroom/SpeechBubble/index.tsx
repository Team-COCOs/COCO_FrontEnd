import { useState, useRef } from "react";
import { useDrag } from "react-dnd";
import { SpeechBubbleStyled } from "./styled";

export interface SpeechBubbleItem {
  id: string;
  text: string;
  left: number | string;
  top: number | string;
  type: "speechBubble";
}

interface SpeechBubbleItemProps {
  item: SpeechBubbleItem;
  onTextChange: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

const SpeechBubble: React.FC<SpeechBubbleItemProps> = ({
  item,
  onTextChange,
  onDelete,
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
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        zIndex: 100,
      }}
    >
      <SpeechBubbleStyled>
        <div className="speech-bubble Gulim">
          {/* 삭제 버튼 */}
          <button
            onClick={() => onDelete(item.id)}
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              background: "orange",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "15px",
              height: "15px",
              cursor: "pointer",
              fontSize: "12px",
              zIndex: 101,
            }}
          >
            ×
          </button>
          <textarea
            value={item.text}
            onChange={(e) => onTextChange(item.id, e.target.value.slice(0, 15))}
            maxLength={16}
            rows={2}
          />
          <div className="bubble-tail" />
        </div>
      </SpeechBubbleStyled>
    </div>
  );
};

export default SpeechBubble;
