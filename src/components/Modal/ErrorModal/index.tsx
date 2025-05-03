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
        <p>{message}</p>
      </div>
    </>
  );
};

export default ErrorModal;
