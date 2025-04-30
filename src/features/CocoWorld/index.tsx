import { CocoWorldPageStyled } from "./styled";
import { useRouter } from "next/router";

const CocoWorld = () => {
  const router = useRouter();

  return (
    <CocoWorldPageStyled className="CocoWorldPage_wrap">
      <div className="CocoWorldPage_container">
        <div className="CocoWorldPage_left">
          <div className="CocoWorldPage_book_wrap">
            <div className="CocoWorldPage_book_left">왼쪽</div>
            <div className="CocoWorldPage_book_right">오른쪽</div>
          </div>
        </div>
        <div className="CocoWorldPage_right"></div>
      </div>
    </CocoWorldPageStyled>
  );
};

export default CocoWorld;
