import { useAuth } from "@/context/AuthContext";
import { VisitorRightStyled } from "./styled";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import WriteInput from "./WriteInput";
import Cookies from "js-cookie";
import GuestBook from "./GuestBook";

const VisitorRight = () => {
  const router = useRouter();
  const { user } = useAuth();
  const userId = user?.id;
  const queryId = router.query.id;
  const token = Cookies.get("accessToken");

  const [management, setManagement] = useState("관리");
  const [isEditing, setIsEditing] = useState(false);
  const [quote, setQuote] = useState(
    "왜 내가 아는 노래중에는 연가가 이리도 많을까."
  );

  const handleManageClick = () => {
    if (isEditing) {
      setManagement("관리");
    } else {
      setManagement("저장");
    }
    setIsEditing((prev) => !prev);
  };

  return (
    <VisitorRightStyled className="VisitorRight_wrap">
      <div className="VisitorRight_header">
        <div className="VisitorRight_headerBox">
          <div className="VisitorRight_headerFlex">
            <span className="VisitorRight_headerIcon">!</span>
            {isEditing ? (
              <input
                className="VisitorRight_management Gulim"
                type="text"
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
              />
            ) : (
              <p className="Gulim">{quote}</p>
            )}
          </div>
          <button
            className="VisitorRight_headerBtn Gulim"
            onClick={handleManageClick}
          >
            {management}
          </button>
        </div>
      </div>

      <div className="VisitorRight_profile">{token && <WriteInput />}</div>

      <div className="VisitorRight_guestBook">
        <GuestBook />
      </div>
    </VisitorRightStyled>
  );
};
export default VisitorRight;
