import { useEffect } from "react";

interface ConfirmProps {
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmModal = ({ onClose, onConfirm, message }: ConfirmProps) => {
  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text pixelFont">
          confirm - Windows Internet...
        </div>
        <div className="title-bar-controls">
          <button aria-label="Close" onClick={onClose}>
            X
          </button>
        </div>
      </div>
      <div className="window-body">
        <p>
          {message.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>

        <div className="Confirm_btn">
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            확인
          </button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
