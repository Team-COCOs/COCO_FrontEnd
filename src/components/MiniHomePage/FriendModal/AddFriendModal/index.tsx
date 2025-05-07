import { useState } from "react";
import Image from "next/image";
import axiosInstance from "@/utils/axiosInstance";

interface AddFriendModalProps {
  onClose: () => void;
}

const AddFriendModal = ({ onClose }: AddFriendModalProps) => {
  const [message, setMessage] = useState("일촌 신청합니다.");
  const [fromLabelType, setFromLabelType] = useState("직접입력");
  const [toLabelType, setToLabelType] = useState("직접입력");
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");

  const isMessageValid = message.trim() !== "";

  const handleSubmit = () => {
    if (!isMessageValid) return;

    const payload = {
      fromName: "김유빈",
      toName: "차은우",
      fromLabel: fromLabelType === "직접입력" ? fromInput : fromLabelType,
      toLabel: toLabelType === "직접입력" ? toInput : toLabelType,
      message,
    };

    console.log("전송 데이터:", payload);
    // TODO: 실제 전송 처리 로직
    onClose();
  };

  return (
    <>
      <div className="title-bar">
        <div className="title-bar-text">CocoWorld - 일촌신청</div>
        <div className="title-bar-controls">
          <button aria-label="Close" onClick={onClose}>
            X
          </button>
        </div>
      </div>
      <div className="window-body">
        <div className="friendAdd_Error_wrap">
          <div className="friendAdd_Error_skyblue_wrap">
            <div className="friendAdd_Error_img">
              <Image
                src="/modal/friendadd.jpg"
                alt="friend add image"
                fill
                style={{ objectFit: "contain", objectPosition: "top" }}
              />
            </div>

            {/* 보낸이 */}
            <div className="AddFriendModal_sendtime">
              <span>보낸이 : </span>
              <span className="AddFriendModal_sendtime_bluetext">김유빈</span>
              <span className="AddFriendModal_sendtime_graytext">
                (2025.01.01)
              </span>
            </div>

            {/* 신청 대상 */}
            <div className="AddFriendModal_imgBox">
              <div className="AddFriendModal_profile_imgWrap">
                <img
                  src="/avatarImg/headphone_girl.png"
                  alt="senduser_profile"
                />
              </div>
              <div>
                차은우님께
                <br />
                <b>일촌</b>을 신청합니다.
              </div>
            </div>

            {/* 라벨 설정 */}
            <div className="AddFriendModa_friendname_inputWrap">
              <div className="AddFriendModa_friendname">
                <span>차은우</span>님을 김유빈님의{" "}
                <input
                  type="text"
                  value={
                    fromLabelType === "직접입력" ? fromInput : fromLabelType
                  }
                  onChange={
                    (e) => setFromInput(e.target.value.slice(0, 5)) // 최대 5글자 제한
                  }
                  disabled={fromLabelType !== "직접입력"}
                  maxLength={5}
                />{" "}
                로{" "}
                <select
                  value={fromLabelType}
                  onChange={(e) => setFromLabelType(e.target.value)}
                >
                  <option>직접입력</option>
                  <option>일촌</option>
                  <option>친구</option>
                </select>
              </div>

              <div className="AddFriendModa_friendname">
                <span>김유빈</span>님을 차은우님의{" "}
                <input
                  type="text"
                  value={toLabelType === "직접입력" ? toInput : toLabelType}
                  onChange={(e) => setToInput(e.target.value.slice(0, 5))}
                  disabled={toLabelType !== "직접입력"}
                  maxLength={5}
                />{" "}
                로{" "}
                <select
                  value={toLabelType}
                  onChange={(e) => setToLabelType(e.target.value)}
                >
                  <option>직접입력</option>
                  <option>일촌</option>
                  <option>친구</option>
                </select>
              </div>
            </div>

            {/* 메세지 입력 */}
            <div className="AddFriendModal_textarea_wrap">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="메시지를 입력하세요. (50자 제한)"
                className="AddFriendModal_textarea"
                maxLength={50}
              />
            </div>

            <div>상대방이 동의하시면 일촌이 맺어집니다.</div>

            {/* 버튼 */}
            <div className="AddFriendModal_btns">
              <button onClick={handleSubmit} disabled={!isMessageValid}>
                보내기
              </button>
              <button onClick={onClose}>취소</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFriendModal;
