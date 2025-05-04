import Image from "next/image";

interface ErrorModal {
  onClose: () => void;
  message: string;
}

const ErrorModal = ({ onClose, message }: ErrorModal) => {
  return (
    <>
      <div className="title-bar">
        <div className="title-bar-text">Error</div>
        <div className="title-bar-controls">
          <button aria-label="Close" onClick={onClose}>
            X
          </button>
        </div>
      </div>
      <div className="window-body">
        <div className="Error_img">
          <Image src="/modal/errorModal.png" alt="error image" fill />
        </div>
        <p className="pixelFont">{message}</p>
      </div>
    </>
  );
};

export default ErrorModal;
