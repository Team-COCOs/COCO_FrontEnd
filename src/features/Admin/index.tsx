import { AdminPageStyled } from "./styled";
import { useRouter } from "next/router";

const Admin = () => {
  const router = useRouter();

  return (
    <AdminPageStyled className="AdminPage_wrap">
      <div className="AdminPage_container">
        <div className="AdminPage_profile"></div>
        <div className="AdminPage_store"></div>
      </div>
    </AdminPageStyled>
  );
};

export default Admin;
