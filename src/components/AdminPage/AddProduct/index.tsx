import { AddProductStyled } from "./styled";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";

interface AddProductProps {
  title: string;
  type: "img" | "music";
  selectedKey: string;
}

const AddProduct: React.FC<AddProductProps> = ({
  title,
  type,
  selectedKey,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  // 음악 시간 계산
  const [durationFormatted, setDurationFormatted] = useState("");

  // nav 탭 바뀌면 내용 초기화
  useEffect(() => {
    formik.setValues({
      name: "",
      price: "",
      category: "",
      file: null,
      artist: "",
      duration: "",
    });
    setPreview(null);
    setAudioURL(null);
  }, [selectedKey]);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      category: "",
      file: null as File | null,
      artist: "",
      duration: "",
    },
    validate: (values) => {
      const errors: Record<string, string> = {};
      if (!values.name) errors.name = "상품명을 입력해주세요.";
      if (!values.price) errors.price = "가격을 입력해주세요.";
      else if (isNaN(Number(values.price)))
        errors.price = "숫자만 입력해주세요.";
      if (!values.file) errors.file = "파일을 업로드해주세요.";

      if (type === "music") {
        if (!values.artist) errors.artist = "아티스트 이름을 입력해주세요.";
        if (!values.duration) errors.duration = "재생 시간을 입력해주세요.";
      }

      return errors;
    },
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("category", values.category);
      if (values.file) formData.append("file", values.file);
      if (type === "music") {
        formData.append("artist", values.artist);
        formData.append("duration", values.duration);
      }

      console.log("폼 제출", values);
      // axios.post("/api/products", formData)
    },
  });

  // 음악 시간 계산
  useEffect(() => {
    if (type === "music" && formik.values.duration) {
      const totalSeconds = Number(formik.values.duration);
      if (!isNaN(totalSeconds)) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        setDurationFormatted(
          `${minutes}:${seconds.toString().padStart(2, "0")}`
        );
      } else {
        setDurationFormatted("");
      }
    }
  }, [formik.values.duration, type]);

  useEffect(() => {
    const file = formik.values.file;
    if (!file) return;

    const url = URL.createObjectURL(file);

    if (type === "img") {
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }

    if (type === "music") {
      setAudioURL(url);

      const audio = document.createElement("audio");
      audio.src = url;
      audio.addEventListener("loadedmetadata", () => {
        const seconds = Math.floor(audio.duration);
        formik.setFieldValue("duration", seconds.toString());
      });

      return () => URL.revokeObjectURL(url);
    }
  }, [formik.values.file, type]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>{title}</h2>
      <div>
        <label>상품명</label>
        <input
          type="text"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name && (
          <div style={{ color: "red" }}>{formik.errors.name}</div>
        )}
      </div>
      <div>
        <label>가격</label>
        <input
          type="number"
          name="price"
          onChange={formik.handleChange}
          value={formik.values.price}
        />
        {formik.errors.price && (
          <div style={{ color: "red" }}>{formik.errors.price}</div>
        )}
      </div>

      <div>
        <label>카테고리</label>
        <select
          name="category"
          onChange={formik.handleChange}
          value={formik.values.category}
        >
          <option value="">선택하세요</option>
          {type === "music" ? (
            <option value="노래">노래</option>
          ) : (
            <>
              <option value="미니홈피 배경">미니홈피 배경</option>
              <option value="다이어리 배경">다이어리 배경</option>
              <option value="탭">탭</option>
              <option value="미니룸">미니룸</option>
              <option value="미니미">미니미</option>
            </>
          )}
        </select>
      </div>

      <div>
        <label>
          {type === "img" ? "이미지 파일 업로드" : "음원 파일 업로드"}
        </label>
        <input
          type="file"
          name="file"
          accept={type === "img" ? "image/*" : ".mp3,audio/*"}
          onChange={(e) => {
            const file = e.currentTarget.files?.[0] ?? null;
            formik.setFieldValue("file", file);
          }}
        />
        {formik.errors.file && (
          <div style={{ color: "red" }}>{formik.errors.file}</div>
        )}

        {/* 미리보기 */}
        {type === "img" && preview && (
          <div>
            <img
              src={preview}
              alt="미리보기"
              style={{ width: "200px", marginTop: "10px" }}
            />
          </div>
        )}
        {type === "music" && audioURL && (
          <div>
            <audio controls src={audioURL} style={{ marginTop: "10px" }} />
          </div>
        )}
      </div>

      {type === "music" && (
        <>
          <div>
            <label>아티스트</label>
            <input
              type="text"
              name="artist"
              onChange={formik.handleChange}
              value={formik.values.artist}
            />
            {formik.errors.artist && (
              <div style={{ color: "red" }}>{formik.errors.artist}</div>
            )}
          </div>

          <div>
            <label>재생 시간 (초)</label>
            <input
              type="number"
              name="duration"
              value={formik.values.duration}
              onChange={formik.handleChange}
              readOnly
            />
            {formik.errors.duration && (
              <div style={{ color: "red" }}>{formik.errors.duration}</div>
            )}{" "}
            {durationFormatted && (
              <div style={{ marginTop: "5px", color: "gray" }}>
                재생 시간: {durationFormatted}
              </div>
            )}
          </div>
        </>
      )}

      <button type="submit" style={{ marginTop: "20px" }}>
        상품 등록
      </button>
    </form>
  );
};

export default AddProduct;
