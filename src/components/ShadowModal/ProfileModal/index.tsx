import { useState } from "react";
import ShadowModal from "..";
import EmptyPage from "@/components/EmptyPage";
import DOMPurify from "dompurify";
import { ModalProvider } from "@/context/ModalContext";
interface ProfileModalProps {
  onClose: () => void;
  data: any;
  type: string;
  userName: string;
}

const ProfileModal = ({ onClose, data, type, userName }: ProfileModalProps) => {
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
          {data.length === 0 ? (
            <div className="newPost_emptyImg">
              <EmptyPage />
            </div>
          ) : type === "newPost" ? (
            data.map((d: any) => (
              <div key={d.id} className="newPost_div">
                <div className="newPost_texts">
                  <div className="newPost_title">제목 : {d.title}</div>
                  <div
                    className="newPost_content"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(d.content),
                    }}
                  />
                </div>
                <div className="newPost_date">{d.createdAt}</div>
              </div>
            ))
          ) : (
            data.map((d: any) => (
              <div
                key={d.id}
                className="newFriend_div"
                onClick={() => newModal(d)}
              >
                <div className="newPost_title">{d.requester}</div>
                <div className="newPost_date">{d.receivedAt}</div>
              </div>
            ))
          )}
        </div>
      </div>

      {isOpen && (
        <ModalProvider>
          <ShadowModal
            type="friendReq"
            isOpen={isOpen}
            onClose={() => {
              setIsOpen(false);
              onClose();
            }}
            data={reqData}
            userName={userName}
          />
        </ModalProvider>
      )}
    </>
  );
};

export default ProfileModal;
