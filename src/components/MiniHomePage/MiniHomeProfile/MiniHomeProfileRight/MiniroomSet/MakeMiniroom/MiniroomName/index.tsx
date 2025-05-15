import React from "react";
import { MiniroomNameStyled } from "./styled";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";

import axios from "axios";
import { useRouter } from "next/router";

const MiniroomName = () => {
  const router = useRouter();
  const { id } = router.query;
  // 미니룸 이름 관리
  const [name, setName] = useState("");

  // 미니룸 이름 불러오기
  useEffect(() => {
    if (!id) return;
    const fetchMiniroomName = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/minirooms/${id}/title`
        );
        setName(response.data.title);
      } catch (e: any) {
        console.log(e, "미니룸 이름 e");
      }
    };
    fetchMiniroomName();
  }, [id]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setName(value);
    }
  };

  const handleSave = async () => {
    if (name.length === 0) {
      alert("이름을 입력해주세요.");
    } else {
      const res = await axiosInstance.patch(`/minirooms/title`, { name });

      alert(`미니룸 이름이 변경되었습니다.`);
      router.push(`/home/${id}`);
    }
  };

  return (
    <MiniroomNameStyled>
      <div className="MiniroomName_wrap_title_fix">
        <div className="MiniroomName_wrap_title Gulim">
          <p>
            미니룸 이름 수정하기 <span>(10자 이내)</span>
          </p>
        </div>
        <div className="MiniroomNamefix_box">
          <input
            className="MiniroomNamefix_input"
            value={name === null || name === undefined ? "미니룸" : name}
            onChange={handleNameChange}
            maxLength={10}
          ></input>
          <button className="MiniroomName_saveBtn Gulim" onClick={handleSave}>
            저장
          </button>
        </div>
      </div>
      <div className="MiniroomName_wrap_title Gulim">미니룸 수정하기</div>
    </MiniroomNameStyled>
  );
};

export default MiniroomName;
