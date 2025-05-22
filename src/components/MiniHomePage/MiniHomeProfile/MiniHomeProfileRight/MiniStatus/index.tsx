import { MiniStatusStyle } from "./styled";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "@/lib/axios";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { useRouter } from "next/router";
import Skeleton from "@mui/material/Skeleton";

interface UserData {
  title: string;
  minihompi_image: string;
  mood: string;
  introduction: string;
}

const MiniStatus = () => {
  const [minihompi_image, setMinihompi_image] = useState<string>(
    "/avatarImg/defaultProfile.png"
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { user } = useAuth();
  const userId = user?.id;
  const { id } = router.query;
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/minihomepis/${userId}/my-status`
        );

        console.log("userData : ", res.data);

        setUserData(res.data);
        setMinihompi_image(res.data.minihompi_image);
      } catch (e) {
        console.error("에러 발생:", e);
      }
    };
    fetchUserInfo();
  }, [userId]);

  // 이미지 url로 변환 후 업데이트
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setMinihompi_image(fileUrl);
      setSelectedFile(file);
    }
  };

  // 데이터 저장 함수
  const saveData = async (values: UserData) => {
    if (!userId) {
      alert("로그인이 필요합니다.");
      router.push(`/home/${id}`);
      return;
    }

    if (values.introduction.length > 50) {
      alert("소개글은 50자 이내로 작성해주세요.");
      return;
    }

    const formData = new FormData();

    formData.append("name", values.title);
    if (selectedFile) {
      formData.append("minihompi_image", selectedFile);
    } else {
      formData.append("minihompi_image_url", values.minihompi_image);
    }
    formData.append("status", values.mood);
    formData.append("introduction", values.introduction);

    try {
      const res = await axiosInstance.post("/minihomepis/info", formData);

      if (res.data.message === "저장 완료") {
        alert("저장 완료!");
        window.location.reload();
      }
    } catch (e: any) {
      console.log(e.response?.data);
    }
  };

  // 초기 데이터
  const initialValues: UserData = {
    title: userData?.title || "",
    minihompi_image:
      userData?.minihompi_image || "/avatarImg/defaultProfile.png",
    mood: userData?.mood || "happy",
    introduction: userData?.introduction || "",
  };

  return (
    <MiniStatusStyle className="MiniStatus_wrap">
      <span className="MiniStatus_title Gulim">내 상태 관리하기</span>

      <Formik
        initialValues={initialValues}
        onSubmit={saveData}
        enableReinitialize={true}
      >
        <Form>
          <div className="MiniStatus_top">
            <div className="MiniStatus_left">
              <div className="MiniStatus_img">
                {!loaded && (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    sx={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
                  />
                )}
                <Image
                  src={minihompi_image || "/avatarImg/defaultProfile.png"}
                  alt="profile"
                  fill
                  onLoad={() => setLoaded(true)}
                />
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
              <div className="MiniStatus_introduce">
                <span className="pixelFont MiniStatus_subTitle">
                  <span className="MiniStatus_icon">🟧</span>내 상태
                </span>
                <div className="MiniStatus_state">
                  <span className="pixelFont">Today is...</span>
                  <Field
                    as="select"
                    name="mood"
                    className="MiniStatus_select pixelFont"
                  >
                    <option value="happy">😊 행복</option>
                    <option value="joy">🎵 즐거움</option>
                    <option value="busy">💼 바쁨</option>
                    <option value="sad">🌧️ 슬픔</option>
                    <option value="angry">💢 화남</option>
                  </Field>
                </div>
              </div>
              <div className="MiniStatus_introduce">
                <span className="pixelFont MiniStatus_subTitle">
                  <span className="MiniStatus_icon">🟧</span>소개글
                </span>
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
              <span className="pixelFont MiniStatus_subTitle">
                <span className="MiniStatus_icon">🟧</span>미니홈피 이름
              </span>
              <Field
                className="Gulim"
                type="text"
                name="title"
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
      </Formik>
    </MiniStatusStyle>
  );
};

export default MiniStatus;
