import { useEffect, useState } from "react";
import { ModalStyle } from "./styled";
import ErrorModal from "./ErrorModal";

interface ModalProps {
  type: string;
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const Modal = ({ type, isOpen, onClose, message }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/styles/98.css/dist/98.css"; // 98.css의 CDN 링크

      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link); // 컴포넌트가 언마운트될 때 제거
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const renderModalByType = () => {
    switch (type) {
      case "error":
        return <ErrorModal onClose={onClose} message={message} />;

      default:
        return null;
    }
  };

  return (
    <ModalStyle className="Modal_window">{renderModalByType()}</ModalStyle>
  );
};

export default Modal;
