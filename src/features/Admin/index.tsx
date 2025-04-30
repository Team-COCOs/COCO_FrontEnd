import { AdminPageStyled } from "./styled";
import { useRouter } from "next/router";
import AdminNav from "@/components/AdminPage/AdminNav";

const Admin = () => {
  const router = useRouter();

  // 관리자 홈으로 이동
  const handleLogoClick = () => {
    router.push("/admin");
  };

  // 메인 페이지로 이동
  const handleHomeClick = () => {
    router.push("/");
  };

  return (
    <AdminPageStyled className="AdminPage_wrap">
      {/* 헤더 */}
      <div className="AdminPage_container">
        <div className="AdminPage_header">
          <div className="AdminPage_header_logo" onClick={handleLogoClick}>
            <img src="/cocoworld.png"></img>
          </div>
          <h2 onClick={handleLogoClick}>CocoWorld Admin Page</h2>
        </div>
        <div className="AdminPage_profile"></div>
        <div className="AdminPage_store"></div>
      </div>
      {/* 헤더 끝 */}

      {/* 상품 관리 왼쪽 메뉴바 */}
      <AdminNav />
      {/* 상품 등록 */}
    </AdminPageStyled>
  );
};

export default Admin;
