import Image from "next/image";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

interface FriendModalProps {
  onClose: () => void;
  data: any;
}

const FriendModal = ({ onClose, data }: FriendModalProps) => {
  return (
    <>
      <div className="title-bar">
        <div className="title-bar-text">
          코코월드 일촌신청 - Windows Internet...
        </div>
        <div className="title-bar-controls">
          <button aria-label="Close" onClick={onClose}>
            X
          </button>
        </div>
      </div>
      <div className="window-body">
        <div className="Friend_div pixelFont">
          <div className="Friend_header">
            <Image src="/modal/friendadd.jpg" alt="friend image" fill />
          </div>

          <div className="Friend_send">
            <div className="Friend_sendName">
              보낸이 : <span>{data.requester}</span>
            </div>
            <span className="newPost_date">{data.receivedAt}</span>
          </div>

          <div className="Friend_info">
            <div className="Friend_img">
              <Image src={data.profileImg} alt="friend image" fill />
            </div>
            <div className="Friend_texts">
              <p>"{data.requester}"님께서 일촌맺기를 희망합니다.</p>
              <p>일촌을 맺으시겠습니까?</p>
            </div>
          </div>

          <div className="Friend_btns">
            <button className="Friend_btn">수락</button>
            <button className="Friend_btn">거절</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendModal;
