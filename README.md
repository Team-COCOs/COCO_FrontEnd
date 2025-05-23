# 🧸 Cocoworld Minihompy Project
이 프로젝트는 2000년대 감성의 싸이월드 미니홈피를 현대적인 웹 기술로 재현한 프로젝트입니다.
유저는 홈, 프로필, 다이어리, 사진첩, 방명록, 일촌 등 다양한 기능을 통해 추억의 미니홈피를 경험할 수 있습니다.

### 📌 배포 주소

- 배포 주소 : [COCOWORLD 바로가기](http://34.236.72.45/)
- 테스트 계정 : id: cocoworld@cocoworld.com / pw: coco1234!!

## 🔖 목차  
> **프로젝트 개요**
> 
> 📌 [①  프로젝트 소개](#-프로젝트-소개)  
> 📌 [②  개발 동기](#-개발-동기)  
> 📌 [③  웹 개발팀 소개](#-웹-개발팀-소개)  
> 📌 [④  개발 환경](#-개발-환경)  

---

>  **UI & 기능 소개**
>
> 📌 [⑤ ERD](#-erd)  
> 📌 [⑥  프로토타입](#-프로토타입)  
> 📌 [⑦  화면 구성](#-화면-구성)  
> 📌 [⑧  주요 기능](#-주요-기능)  

<br/>

### 📌 프로젝트 소개
- 싸이월드 미니홈피를 모티브로 한 웹 프로젝트입니다.
- Next.js, NestJS, 등을 사용하여 추억의 미니홈피 기능을 구현하고 있습니다.
- 2000년대 감성 그대로! 도토리로 아이템을 사고, 미니룸을 꾸미고, 일촌과 교류하며 나만의 미니홈피를 만들어볼 수 있습니다.

### 🔅 프로젝트 실행
```
npm install
npm run dev
```

### ⏱ 개발 기간
- 2025.04.28 ~ 2025.05.21

### 🖼️ 미리보기
![image](https://github.com/user-attachments/assets/fe091143-4bb0-4665-8577-2c18c3f60d79)
<img src="https://github.com/user-attachments/assets/061ddae4-e3a4-40fe-8ad5-f084c14354e1" width="80%"/>
![image](https://github.com/user-attachments/assets/2d75f56e-5cb2-40d8-963a-244b2c031351)
![image](https://github.com/user-attachments/assets/78a186a0-e3ba-4268-92cd-1128a480f0b5)

## 🧩 주요 기능

### 🏠 메인 페이지
- 메인 페이지에서는 화제의 미니홈피, 미니홈피 검색, 도토리 충전(토스 API), 스킨 및 아이템 구매, 미니홈피 이동이 가능합니다. 
- 새 게시물, 일촌 신청 확인이 가능합니다.
- 회원가입 및 로그인이 가능합니다.
- (토스 API) 도토리 충전이 가능합니다.
- 도토리를 사용하여 아이템 구매가 가능합니다.
- 스킨, 미니미, 가구, 배경 음악 등 다양한 아이템을 구매할 수 있습니다.

### 🛠 admin

- 관리자 전용 페이지입니다.
- 상품을 등록 및 삭제할 수 있습니다

### 🧸 미니홈피 (홈)
- 방문자 수(Today / Total), 프로필, 일촌 확인이 가능합니다.
- 최근 사진첩 게시물 확인이 가능합니다.
- 일촌평 작성 및 확인이 가능합니다.
- 파도타기(랜덤 미니홈피 방문)가 가능합니다.
- 일촌 확인이 가능합니다.
- 배경 음악 설정 및 재생이 가능합니다.
- 홈 UI 커스터마이징(탭, 배경색 등)이 가능합니다.

### 🎨 프로필
- 상태 메시지 및 기분 아이콘 설정이 가능합니다.
- 프로필 이미지 및 자기소개 등록을 할 수 있습니다.
- 배경 음악(BGM) 관리 및 설정이 가능합니다.

### 🧸 미니미 & 미니룸
- 대표 미니미 설정 기능이 있습니다.
- 드래그 앤 드롭 방식으로 미니룸 꾸미기가 가능합니다.
- 구매한 아이템 목록 확인이 가능합니다.
- 말풍선 입력 및 위치 지정이 가능합니다.
- 모바일 터치 대응 및 반응형 렌더링이 되도록 설정하였습니다.

### 📅 다이어리
- React-calendar를 커스텀하여 적용하였습니다.
- 날짜별, 내용 검색별, 폴더별로 일기 확인이 가능합니다.
- 일촌공개, 비공개, 전체공개가 가능합니다. 
- 일기 작성, 수정, 삭제가 가능합니다.
- 댓글, 대댓글 작성 및 삭제가 가능합니다.
- 페이지네이션을 사용하였습니다.
- 폴더 관리가 가능합니다.

### 🖼️ 게시판
- 사진을 포함한 글 작성, 수정, 삭제가 가능합니다.
- 스크랩 기능이 있습니다.
- 폴더 관리 기능이 있어서 사용자가 폴더를 수정할 수 있습니다.
- 댓글, 대댓글 작성이 가능합니다.
- 전체공개, 일촌공개, 비공개 설정이 가능합니다.
- 에디터로 글꼴 및 글씨 크기 선택이 가능합니다.

### 📝 방명록
- 방문자가 메시지를 남길 수 있으며, 비밀글 설정이 가능합니다.
- 삭제가 가능합니다.
- 공지사항을 입력할 수 있습니다.

### 💬 COCO (챗봇)
- 2000년대 말투로 대답해주는 챗봇 기능입니다. 
- Botpress를 활용해, 2000년대 말투와 감성을 살린 레트로 스타일 챗봇을 구현했습니다.

### ⚙️ 관리 페이지
- 미니홈피 효과 변경이 가능합니다. (미니홈피 배경, 탭 색, 탭 언어)
- 유저 정보 수정이 가능합니다. (전화번호, 비밀번호)
- 일촌 관리가 가능합니다.
- 회원 탈퇴가 가능합니다. 
- 탈퇴 시 유저 삭제가 아닌 탈퇴한 미니홈피로 검색 및 이동 되도록 설정하였습니다. 

### 🖼️ 반응형 미리보기
<img width="214" alt="image" src="https://github.com/user-attachments/assets/42b97022-3f4a-4dae-b7c2-c53431441537" />
<img width="208" alt="image" src="https://github.com/user-attachments/assets/e3005417-8118-49e4-988d-7564c3e7aeb2" />

