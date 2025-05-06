import { useState } from "react";
import ShadowModal from "..";

interface ProfileModalProps {
  onClose: () => void;
  data: any;
  type: string;
}

const ProfileModal = ({ onClose, data, type }: ProfileModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reqData, setReqData] = useState<any>(null);

  const newModal = (requester: any) => {
    setIsOpen(true);
    setReqData(requester);
  };

  return (
    <>
      <div className="title-bar">
        <div className="title-bar-text">
          {type === "newPost" ? "새게시물" : "일촌신청"} - Windows Internet...
        </div>
        <div className="title-bar-controls">
          <button aria-label="Close" onClick={onClose}>
            X
          </button>
        </div>
      </div>
      <div className="window-body">
        <div className="pixelFont">
          {type === "newPost"
            ? data.map((d: any) => (
                <div key={d.id} className="newPost_div">
                  <div className="newPost_texts">
                    <div className="newPost_title">{d.title}</div>
                    <div className="newPost_content">{d.content}</div>
                  </div>
                  <div className="newPost_date">{d.createdAt}</div>
                </div>
              ))
            : data.map((d: any) => (
                <div
                  key={d.id}
                  className="newPost_div"
                  onClick={() => newModal(d)}
                >
                  <div className="newPost_title">{d.requester}</div>
                  <div className="newPost_date">{d.receivedAt}</div>
                </div>
              ))}
        </div>
      </div>

      {isOpen && (
        <ShadowModal
          type="friendReq"
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            onClose();
          }}
          data={reqData}
        />
      )}
    </>
  );
};

export default ProfileModal;
