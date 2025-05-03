import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";

const IdFind = () => {
  const [userId, setUserId] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
    },
    onSubmit: (values) => {
      if (!values.name.trim() || !values.phone.trim()) {
        setUserId("이름과 전화번호를 입력해주세요.");
        return;
      }
      const cleanPhoneNumber = values.phone.replace(/-/g, "");

      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/findId`, {
          name: values.name,
          phone: cleanPhoneNumber,
        })
        .then((res) => {
          setUserId(res.data.email);
        })
        .catch((e) => {
          if (e.response.status === 404) {
            setUserId(e.response.data.message);
          }
        });
    },
  });

  const handlePhoneChange = (e: any) => {
    let value = e.target.value.replace(/[^\d]/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 3 && value.length <= 6) {
      value = value.replace(/(\d{3})(\d{1,4})/, "$1-$2");
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{4})(\d{1,4})/, "$1-$2-$3");
    }
    formik.setFieldValue("phone", value);
  };

  return (
    <div className="InfoFind_wrap">
      <div className="InfoFind_header">이메일 찾기</div>
      <form
        className="InfoFind_container IdFind_container"
        onSubmit={formik.handleSubmit}
      >
        <div className="InfoFind_div">
          <div className="mainFont">이름</div>
          <input
            name="name"
            placeholder="이름을 입력해주세요"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </div>
        <div className="InfoFind_errorDiv">
          <div className="InfoFind_div">
            <div className="mainFont">전화번호</div>
            <input
              name="phone"
              placeholder="전화번호를 입력해주세요"
              value={formik.values.phone}
              onChange={handlePhoneChange}
            />
          </div>
          <div className="InfoFind_error IdFind_result">{userId}</div>
        </div>

        <button className="IdFind_btn" type="submit">
          아이디 찾기
        </button>
      </form>
    </div>
  );
};

export default IdFind;
