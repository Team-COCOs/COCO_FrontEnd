import { GuestBookStyle } from "./styled";

const GuestBook = () => {
  return (
    <GuestBookStyle className="GuestBook_wrap">
      {/* header부터 map 돌리기 */}
      <div className="GuestBook_header">
        <div className="GuestBook_info Gulim">
          <span>NO.9</span>
          <span>이름</span>
          <span>(2006.09.13 22:16)</span>
        </div>

        <div className="GuestBook_btns">
          <button className="Gulim">비밀로 하기</button>
          <button className="Gulim">삭제</button>
        </div>
      </div>
    </GuestBookStyle>
  );
};

export default GuestBook;
