import axiosInstance from "@/lib/axios";
import Image from "next/image";
import { useState } from "react";
import ShadowModal from "../..";
import Skeleton from "@mui/material/Skeleton";

interface FriendModalProps {
  onClose: () => void;
  data: any;
  userName: string;
}

const FriendModal = ({ onClose, data, userName }: FriendModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loaded, setLoaded] = useState(false);

  const frienRequest = async (type: string) => {
    try {
      const res = await axiosInstance.post(`/friends/${type}`, {
        requesterId: data.requesterId,
      });
      setMessage(res.data.message);
      setIsOpen(true);
    } catch (e) {
      console.log(e);
    }
  };

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
              {!loaded && (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  sx={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
                />
              )}
              <Image
                src={
                  data.profileImg === null
                    ? data.requester_gender === "man"
                      ? "/avatarImg/man_avatar1.png"
                      : "/avatarImg/woman_avatar1.png"
                    : data.profileImg
                }
                alt="friend image"
                onLoad={() => setLoaded(true)}
                fill
              />
            </div>
            <div className="Friend_texts">
              <p>
                "{data.requester}"님께서 "{userName}"님과 일촌맺기를 희망합니다.
              </p>
              <p>일촌을 맺으시겠습니까?</p>
            </div>
          </div>

          <div className="Friend_nickName">
            <p> 해당 일촌명으로 신청하셨습니다. </p>
            <p>
              {data.requester}({data.requester_name}) - {userName}(
              {data.receiver_name})
            </p>
          </div>
          <b className="Friend_bold">일촌을 맺으시겠습니까?</b>

          <div className="Friend_coment">
            <textarea value={data.message} readOnly></textarea>
          </div>

          <div className="Friend_btns">
            <button
              className="Friend_btn"
              onClick={() => frienRequest("accept")}
            >
              수락
            </button>
            <button
              className="Friend_btn"
              onClick={() => frienRequest("reject")}
            >
              거절
            </button>
          </div>
        </div>
      </div>

      <ShadowModal
        type="success"
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          onClose();
          window.location.href = "/";
        }}
        message={message}
      />
    </>
  );
};

export default FriendModal;
