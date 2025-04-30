import { AdminPageStyled } from "./styled";
import { useRouter } from "next/router";

const Admin = () => {
  const router = useRouter();

  return (
    <AdminPageStyled className="AdminPage_wrap">
      {/* 헤더 */}
      <div className="AdminPage_container">
        <div className="AdminPage_header">
          <div className="AdminPage_header_logo">
            <img src="/cocoworld.png"></img>
          </div>
          <h2>CocoWorld Admin Page</h2>
        </div>
        <div className="AdminPage_profile"></div>
        <div className="AdminPage_store"></div>
      </div>
      {/* 헤더 끝 */}
    </AdminPageStyled>
  );
};

export default Admin;
