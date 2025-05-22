import { useEffect } from "react";

interface ConfirmProps {
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmModal = ({ onClose, onConfirm }: ConfirmProps) => {
  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text pixelFont">
          아이템 구매 - Windows Internet...
        </div>
        <div className="title-bar-controls">
          <button aria-label="Close" onClick={onClose}>
            X
          </button>
        </div>
      </div>
      <div className="window-body">
        <p>정말 구매하시겠습니까?</p>
        <div className="Confirm_btn">
          <button onClick={onConfirm}>확인</button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
