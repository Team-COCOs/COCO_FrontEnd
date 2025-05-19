import clsx from "clsx";
import { SearchUserStyle } from "./styled";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

interface UserSearch {
  id: number;
  name: string;
  profile_image: string;
  gender: string;
  birthday: string;
}

const SearchUser = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const [results, setResults] = useState<UserSearch[]>([]);

  // 해당 유저 이름, pk, 생일, 프로필 이미지, 성별 필요
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/search`,
          {
            params: { keyword },
          }
        );

        console.log("검색 요청 대답 : ", res.data);

        if (Array.isArray(res.data)) {
          const modifiedResults = res.data.map((d: any) => ({
            ...d,
            profile_image:
              d.minimi_image ??
              (d.gender === "woman"
                ? "/avatarImg/woman_avatar1.png"
                : "/avatarImg/man_avatar1.png"),
          }));
          setResults(modifiedResults);
        }
      } catch (e) {
        console.log("검색 요청 실패:", e);
        setResults([]);
      }
    };

    fetchSearchResults();
  }, [keyword]);

  return (
    <SearchUserStyle className={clsx("SearchUser_wrap")}>
      <p className="SearchUser_result">🔍 "{keyword}" 검색 결과</p>
      {results.length !== 0 ? (
        <ul>
          {results.map((item: any, index) => (
            <li
              key={index}
              className="SearchUser_item"
              onClick={() => {
                if (item.role !== "withdrawn") {
                  router.push(`/home/${item.id}`);
                }
              }}
            >
              <div className="SearchUser_userInfo">
                <div
                  className={`SearchUser_image ${
                    item.profile_image?.endsWith(".png") && "SearchUser_png"
                  }`}
                >
                  <Image
                    src={item.profile_image}
                    alt={`${item.name}의 이미지`}
                    fill
                  />
                </div>
                <div className="SearchUser_info">
                  <p
                    className={clsx(
                      "SearchUser_name",
                      item.role === "withdrawn" && "SearchUser_delete"
                    )}
                  >
                    {item.name}
                  </p>
                  <p className="SearchUser_sub">
                    성별: {item.gender === "man" ? "남성" : "여성"}
                  </p>
                  <p className="SearchUser_sub"> 생일: {item.birthday} </p>
                </div>
              </div>
              {item.role !== "withdrawn" && (
                <span>
                  보러가기 <span className="SearchUser_link">&gt;</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="SearchUser_none">
          <div className="SearchUser_img">
            <Image src="/searchImg.png" alt="user image" fill />
          </div>
          <p className="SearchUser_text mainFont">
            "{keyword}"님은 존재하지 않는 유저입니다.
          </p>
        </div>
      )}
    </SearchUserStyle>
  );
};

export default SearchUser;
