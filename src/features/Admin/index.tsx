import React, { useState } from "react";
import { AdminPageStyled } from "./styled";
import { useRouter } from "next/router";
import AdminNav from "@/components/AdminPage/AdminNav";
import AdminRight from "@/components/AdminPage/AdminRight";

const Admin = () => {
  // nav 바 key 값 저장
  const [selectedKey, setSelectedKey] = useState("1");
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
          <div className="AdminPage_header_logo" onClick={handleHomeClick}>
            <img src="/cocoworld.png"></img>
          </div>
          <h2 onClick={handleLogoClick}>CocoWorld Admin Page</h2>
        </div>
      </div>
      {/* 헤더 끝 */}

      <div className="Admin_content_wrap">
        <div>
          {/* 상품 관리 왼쪽 메뉴바 컴포넌트*/}
          <AdminNav onSelectKey={setSelectedKey} />
        </div>
        <div>
          {/* 상품 관리 오른쪽 content 컴포넌트*/}
          <AdminRight selectedKey={selectedKey} />
        </div>
      </div>
    </AdminPageStyled>
  );
};

export default Admin;
