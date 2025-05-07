import clsx from "clsx";
import { SearchUserStyle } from "./styled";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

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
  // useEffect(() => {

  //   const fetchSearchResults = async () => {
  //     try {
  //       const res = await axios.get(
  //         `${process.env.NEXT_PUBLIC_API_URL}/users/search`,
  //         {
  //           params: { keyword },
  //         }
  //       );

  //       console.log("검색 요청 대답 : ", res.data);
  //       setResults(res.data);
  //     } catch (e) {
  //       console.log("검색 요청 실패:", e);
  //       setResults([]);
  //     }
  //   };

  //   fetchSearchResults();
  // }, [keyword]);

  useEffect(() => {
    // 더미 데이터
    const dummyResults: UserSearch[] = [
      {
        id: 1,
        name: "앨리스",
        profile_image: "/avatarImg/bicycleboy.png",
        gender: "man",
        birthday: "1999-01-10",
      },
      {
        id: 2,
        name: "앨리스",
        profile_image: "/avatarImg/pay_avatar26.png",
        gender: "woman",
        birthday: "2000-01-10",
      },
      {
        id: 3,
        name: "밥",
        profile_image: "/avatarImg/man_avatar1.png",
        gender: "man",
        birthday: "1999-01-02",
      },
      {
        id: 4,
        name: "캐롤",
        profile_image: "/avatarImg/headphone_girl.png",
        gender: "woman",
        birthday: "1999-01-11",
      },
    ];

    // 검색어 필터링
    const filtered = dummyResults.filter((item) => item.name.includes(keyword));

    setResults(filtered);
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
              onClick={() => router.push(`/cocoworld?id=${item.id}`)}
            >
              <div className="SearchUser_userInfo">
                <div className="SearchUser_image">
                  <Image
                    src={item.profile_image}
                    alt={`${item.name}의 이미지`}
                    fill
                  />
                </div>
                <div className="SearchUser_info">
                  <p className="SearchUser_name"> {item.name} </p>
                  <p className="SearchUser_sub">
                    성별: {item.gender === "man" ? "남성" : "여성"}
                  </p>
                  <p className="SearchUser_sub"> 생일: {item.birthday} </p>
                </div>
              </div>
              <span>
                보러가기 <span className="SearchUser_link">&gt;</span>
              </span>
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
