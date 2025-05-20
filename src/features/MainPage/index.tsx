import { MainPageStyled } from "./styled";
import ProfilePart from "@/components/MainPage/ProfilePart";
import StorePart from "@/components/MainPage/StorePart";
import Footer from "@/components/MainPage/Footer";
import Header from "@/components/MainPage/Header";

const MainPage = () => {
  return (
    <>
      <MainPageStyled>
        <div className="MainPage_wrap">
          <Header />
          <div className="MainPage_container">
            <div className="MainPage_profile">
              <ProfilePart />
            </div>
            <div className="MainPage_store">
              <StorePart />
            </div>
          </div>
          <Footer />
        </div>
      </MainPageStyled>
    </>
  );
};

export default MainPage;
