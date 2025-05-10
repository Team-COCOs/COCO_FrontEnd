import styled from "styled-components";

export const SpeechBubbleStyled = styled.div`
  .speech-bubble {
    position: relative;
    background: #fff;
    border: 1.5px solid #999;
    border-radius: 10px;
    padding: 8px;
    width: 120px;
    z-index: 1;

    textarea {
      width: 100%;
      resize: none;
      border: none;
      outline: none;
      font-size: 12px;
      background: transparent;
      overflow-y: hidden;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      height: auto;
    }
  }

  /* .bubble-tail {
    position: absolute;
    bottom: -10px;
    left: 20px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-top-color: #fff;
    z-index: 0;
  } */

  /* .speech-bubble::after {
    content: "";
    position: absolute;
    bottom: -20px;
    left: 45px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-top-color: #999;
    z-index: 0;
  } */
  .speech-bubble::after {
    content: "";
    position: absolute;
    bottom: -9px; /* 꼬리의 위치 조정 */
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

  .speech-bubble::before {
    content: "";
    position: absolute;
    bottom: -7.5px; /* 꼬리의 위치를 위로 조정 */
    left: 50%;
    transform: translateX(-50%); /* 꼬리 중앙 정렬 */
    width: 0;
    height: 0;
    border-top: 0px solid transparent; /* 상단은 투명 */
    border-left: 10px solid white; /* 왼쪽은 흰색 선 */
    border-right: 10px solid transparent; /* 오른쪽은 투명 */
    border-bottom: 8px solid transparent; /* 하단은 투명 */
    z-index: -1;
  }
`;
