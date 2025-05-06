import Image from "next/image";

interface AlertModalProps {
  onClose: () => void;
  message: string;
  type: "success" | "error";
}

const imageMap = {
  success: {
    src: "/modal/payModal.jpg",
    title: "Success",
    alt: "success image",
  },
  error: {
    src: "/modal/errorModal.png",
    title: "Error",
    alt: "error image",
  },
};

const AlertModal = ({ onClose, message, type }: AlertModalProps) => {
  const { src, title, alt } = imageMap[type];

  return (
    <>
      <div className="title-bar">
        <div className="title-bar-text">{title} - Windows Internet...</div>
        <div className="title-bar-controls">
          <button aria-label="Close" onClick={onClose}>
            X
          </button>
        </div>
      </div>
      <div className="window-body">
        <div className="Error_img">
          <Image src={src} alt={alt} fill />
        </div>
        <p className="pixelFont">{message}</p>
      </div>
    </>
  );
};

export default AlertModal;
