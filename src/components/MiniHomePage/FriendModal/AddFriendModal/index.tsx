import Image from "next/image";

interface AddFriendModal {
  onClose: () => void;
}

const AddFriendModal = ({ onClose }: AddFriendModal) => {
  return (
    <>
      <div className="title-bar">
        <div className="title-bar-text">일촌 신청</div>
        <div className="title-bar-controls">
          <button aria-label="Close" onClick={onClose}>
            X
          </button>
        </div>
      </div>
      <div className="window-body">
        <div className="Error_img">
          <Image src="/modal/AddFriendModal.png" alt="error image" fill />
        </div>
        <p className="pixelFont">일촌신청</p>
      </div>
    </>
  );
};

export default AddFriendModal;
