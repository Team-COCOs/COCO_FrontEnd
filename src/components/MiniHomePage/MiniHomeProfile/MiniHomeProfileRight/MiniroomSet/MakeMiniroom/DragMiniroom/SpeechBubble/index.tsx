import { useState, useRef } from "react";
import { useDrag } from "react-dnd";
import { SpeechBubbleStyled } from "./styled";

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

        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        zIndex: 100,
      }}
    >
      <SpeechBubbleStyled>
        <div className="speech-bubble Gulim">
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
