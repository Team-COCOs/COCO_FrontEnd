import { useAuth } from "@/context/AuthContext";
import { VisitorRightStyled } from "./styled";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import WriteInput from "./WriteInput";
import Cookies from "js-cookie";
import GuestBook from "./GuestBook";
import axiosInstance from "@/lib/axios";
import axios from "axios";

const VisitorRight = () => {
  const router = useRouter();
  const { user } = useAuth();
  const userId = user?.id;
  const { id } = router.query;
  const token = Cookies.get("accessToken");

  const [management, setManagement] = useState("관리");
  const [isEditing, setIsEditing] = useState(false);
  const [quote, setQuote] = useState("");

  const handleManageClick = () => {
    if (isEditing) {
      saveQuote();
      setManagement("관리");
    } else {
      setManagement("저장");
    }
    setIsEditing((prev) => !prev);
  };

  useEffect(() => {
    const getQuote = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/minihomepis/management/${id}`
        );
        setQuote(res.data?.content || "");

        console.log("관리 잘 와? ", res.data);
      } catch (err) {
        console.error("관리 가져오기 실패: ", err);
      }
    };

    getQuote();
  }, []);

  // 관리
  const saveQuote = async () => {
    try {
      const res = await axiosInstance.patch("/minihomepis/management", {
        quote: quote,
      });
      console.log("관리 저장 성공 : ", res.data);
    } catch (e) {
      console.error("관리 저장 실패 : ", e);
    }
  };

  return (
    <VisitorRightStyled className="VisitorRight_wrap">
      <div className="VisitorRight_header">
        <div className="VisitorRight_headerBox">
          <div className="VisitorRight_headerFlex">
            <img
              className="VisitorRight_headerIcon"
              src="/icon/volumeIcon.png"
              alt="volumeIcon"
            />
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
          {userId === Number(id) && (
            <button
              className="VisitorRight_headerBtn Gulim"
              onClick={handleManageClick}
            >
              {management}
            </button>
          )}
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
