import clsx from "clsx";
import { SearchStyle } from "./styled";
import { useState } from "react";
import ShadowModal from "@/components/ShadowModal";
import { useRouter } from "next/router";
import { useModal } from "@/context/ModalContext";

const Search = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { type, isOpen, message, openModal, closeModal } = useModal();

  const userSearch = async () => {
    if (!search.trim()) {
      openModal("error", { message: "검색어를 입력해주세요." });
      return;
    }
    router.push(`?keyword=${encodeURIComponent(search.trim())}`);
    setSearch("");
  };

  return (
    <SearchStyle className={clsx("Search_wrap")}>
      <div className="Search_inputBack">
        <div className="Search_input">
          <div className="Search_select">미니홈피</div>

          <div
            className="Search_downBtn"
            onClick={() =>
              isDropdownOpen
                ? setIsDropdownOpen(false)
                : setIsDropdownOpen(true)
            }
          >
            <span className="Search_triangle" />
          </div>

          {isDropdownOpen && (
            <div className="Search_dropdown">
              <p
                className="Search_option"
                onClick={() => setIsDropdownOpen(false)}
              >
                미니홈피
              </p>
            </div>
          )}

          <input
            type="text"
            placeholder="다른 미니홈피를 검색해보세요."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="Search_btn" onClick={userSearch}>
        검색
      </div>

      <ShadowModal
        type={type}
        isOpen={isOpen}
        onClose={closeModal}
        message={message}
      />
    </SearchStyle>
  );
};

export default Search;
