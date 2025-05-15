import styled from "styled-components";

export const MadeRoomStyled = styled.div`
  /* 오른쪽 컴포넌트 기본 CSS 이부분 사용 */
  border-radius: 5px;
  width: 100%;
  height: 100%;
  .MadeRoom_wrap {
    display: flex;
    flex-direction: column;
    padding-top: 7px;

    .MadeRoom_imgWrap {
      width: 100%;
      aspect-ratio: 2/1;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      .MadeRoom_background {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        position: relative;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .MadeRoom_speechBubble,
      .MadeRoom_minimi {
        position: absolute;
      }
      // 미니미 반응형
      @media (max-width: 1024px) {
        .MadeRoom_minimi {
          height: 50px !important;
        }
      }
      @media (max-width: 900px) {
        .MadeRoom_minimi {
          height: 40px !important;
        }
      }
      @media (max-width: 769px) {
        .MadeRoom_minimi {
          height: 50px !important;
        }
      }
      @media (max-width: 600px) {
        .MadeRoom_minimi {
          height: 35px !important;
        }
      }
      @media (max-width: 480px) {
        .MadeRoom_minimi {
          height: 20px !important;
        }
      }
      @media (max-width: 320px) {
        .MadeRoom_minimi {
          height: 15px !important;
        }
      }
      .MadeRoom_SpeechBubble {
        position: relative;
        background: #fff;
        border: 1.5px solid #999;
        border-radius: 10px;
        padding: 8px;
        width: 100px;
        height: 50px;
        font-size: 11px;
        z-index: 1;

        textarea {
          width: 100%;
          resize: none;
          border: none;
          outline: none;
          font-size: 11px;
          background: transparent;
          overflow-y: hidden;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          height: auto;
        }
      }
      // 말풍선 반응형
      @media (max-width: 1024px) {
        .MadeRoom_SpeechBubble {
          width: 100px;
          height: 45px;
          font-size: 10px;
        }
      }
      @media (max-width: 900px) {
        .MadeRoom_SpeechBubble {
          width: 70px;
          height: 45px;
          font-size: 7.5px;
        }
      }
      @media (max-width: 769px) {
        .MadeRoom_SpeechBubble {
          width: 80px;
          height: 40px;
          font-size: 7.5px;
        }
      }
      @media (max-width: 600px) {
        .MadeRoom_SpeechBubble {
          width: 65px;
          height: 37px;
          font-size: 6.5px;
        }
      }
      @media (max-width: 480px) {
        .MadeRoom_SpeechBubble {
          width: 50px;
          height: 30px;
          font-size: 5px;
        }
      }
      @media (max-width: 320px) {
        .MadeRoom_SpeechBubble {
          width: 43px;
          height: 27px;
          font-size: 4px;
        }
      }

      .MadeRoom_SpeechBubble::after {
        content: "";
        position: absolute;
        bottom: -9px;
        left: 50%;
        transform: translateX(-50%); /* 꼬리 중앙 정렬 */
        width: 0;
        height: 0;
        border-top: 0px solid transparent; /* 상단은 투명 */
        border-left: 11px solid #999; /* 왼쪽은 검은색 선 */
        border-right: 11px solid transparent; /* 오른쪽은 투명 */
        border-bottom: 8px solid transparent; /* 하단은 투명 */
        z-index: -2;
      }

      .MadeRoom_SpeechBubble::before {
        content: "";
        position: absolute;
        bottom: -7.5px; /* 꼬리의 위치를 위로 조정 */
        left: 50%;
        transform: translateX(-50%); /* 꼬리 중앙 정렬 */
        width: 0;
        height: 0;
        border-top: 0px solid transparent;
        border-left: 10px solid white;
        border-right: 10px solid transparent;
        border-bottom: 8px solid transparent;
        z-index: -1;
      }
    }
    @media (max-width: 480px) {
      .MadeRoom_imgWrap {
        height: auto;
      }
    }
  }
`;
