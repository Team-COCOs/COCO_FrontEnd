import { MiniStatusStyle } from "./styled";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "@/lib/axios";
import { Field, Form, Formik } from "formik";

interface UserData {
  name: string;
  profileImage: string;
  status: string;
  introduction: string;
}

const MiniStatus = () => {
  const [profileImage, setProfileImage] = useState<string>(
    "/avatarImg/defaultProfile.png"
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);

  // useEffect(() => {
  //   const fetchUserInfo = async () => {
  //     try {
  //       const res = await axiosInstance.get("/getUserInfo");
  //       setUserData(res.data);
  //     } catch (e) {
  //       console.error("에러 발생:", e);
  //     }
  //   };

  //   fetchUserInfo();
  // }, []);

  // Formik의 초기 값 설정
  const initialValues: UserData = {
    name: userData?.name || user?.name || "",
    profileImage: userData?.profileImage || "/avatarImg/defaultProfile.png",
    status: userData?.status || "happy",
    introduction: userData?.introduction || "",
  };

  // 이미지 url로 변환 후 업데이트
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setProfileImage(fileUrl);
    }
  };

  // 데이터 저장 함수
  const saveData = async (values: UserData) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("profileImage", profileImage);
    formData.append("status", values.status);
    formData.append("introduction", values.introduction);

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    // try {
    //   const res = await axiosInstance.post("/setUserData", formData);
    //   console.log(res.data);
    // } catch (e) {
    //   console.log(e);
    // }
  };

  return (
    <MiniStatusStyle className="MiniStatus_wrap">
      <span className="MiniStatus_title Gulim">내 상태 관리하기</span>

      <Formik initialValues={initialValues} onSubmit={saveData}>
        {({ setFieldValue, values }) => (
          <Form>
            <div className="MiniStatus_top">
              <div className="MiniStatus_left">
                <div className="MiniStatus_img">
                  <Image src={profileImage} alt="profile" fill />
                </div>

                <div
                  className="MiniStatus_upload pixelFont"
                  onClick={() => fileInputRef.current?.click()}
                >
                  프로필 선택
                  <input
                    type="file"
                    id="profile-upload"
                    className="MiniStatus_input"
                    ref={fileInputRef}
                    onChange={(e) => handleFileChange(e)}
                    accept="image/*"
                  />
                </div>
              </div>

              <div className="MiniStatus_right">
                <div className="MiniStatus_state">
                  <span className="pixelFont">Today is...</span>
                  <Field
                    as="select"
                    name="status"
                    className="MiniStatus_select pixelFont"
                  >
                    <option value="happy">😊 행복</option>
                    <option value="joy">🎵 즐거움</option>
                    <option value="busy">💼 바쁨</option>
                    <option value="sad">🌧️ 슬픔</option>
                    <option value="angry">💢 화남</option>
                  </Field>
                </div>
                <div className="MiniStatus_introduce">
                  <span className="pixelFont">소개글</span>
                  <Field
                    as="textarea"
                    name="introduction"
                    className="Gulim"
                    placeholder="50자 이내로 내 소개를 적어보세요~"
                  />
                </div>
              </div>
            </div>

            <div className="MiniStatus_bottom">
              <div className="MiniStatus_name">
                <span className="pixelFont">미니홈피 이름</span>
                <Field
                  className="Gulim"
                  type="text"
                  name="name"
                  placeholder={`${user?.name}님의 미니홈피`}
                />
              </div>
            </div>

            <div className="MiniStatus_footer">
              <button className="MiniStatus_btn pixelFont" type="submit">
                저장
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </MiniStatusStyle>
  );
};

export default MiniStatus;
