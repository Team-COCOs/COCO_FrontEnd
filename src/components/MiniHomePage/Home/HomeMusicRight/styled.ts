import styled, { keyframes } from "styled-components";

const scroll = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

export const HomeMusicRightStyled = styled.div`
  .HomeMusicRight_wrap {
    position: absolute;
    right: 45px;
    top: 45px;
    width: 200px;
    font-family: "굴림", "Gulim", sans-serif;
    font-size: 11px;
  }

  /* 선물가게 */
  .HomeMusicRight_shop {
    width: 100%;
    background-color: #f7f7f7;
    border: #ddd 2px solid;
    padding-bottom: 10px;
    margin-bottom: 3px;
    span {
      font-size: 11.5px;
      display: inline-block;
      padding: 10px 10px 8px 10px;
    }
    .HomeMusicRight_shop_imgallwrap {
      display: flex;
      justify-content: center;
      gap: 10px; /* 이미지 간 간격 */
      width: 100%;
      padding: 0px 10px;

      div {
        flex: 1 1 0; /* 동일한 너비 */
        aspect-ratio: 1 / 1; /* 정사각형 비율 유지 */
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          border: 1px solid #4b4b4b;
          width: 100%;
          height: 100%;
          object-fit: cover; /* 이미지가 div 꽉 채우도록 */
          display: block;
        }
      }
    }
  }

  /* 음악 */
  .HomeMusicRight_number {
    font-weight: bold;
    margin-bottom: 4px;
  }

  .HomeMusicRight_player {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    background-color: rgb(230, 230, 230);
    padding: 8px;
    border: 1px solid #ccc;
  }

  .HomeMusicRight_title {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    border: 1px solid #aaa;
    padding: 2px 0;
    position: relative;
    padding-left: 28px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f7f7f7;
  }
  .HomeMusicRight_cd-icon {
    padding-left: 2px;
    z-index: 5;
    background-color: #f7f7f7;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
  }
  .scroll-text {
    display: inline-block;
    min-width: 100%;
    color: #4b4b4b;
  }

  .scroll-text.playing {
    animation: ${scroll} 10s linear infinite;
    animation-play-state: running;
  }

  .scroll-text.paused {
    animation: ${scroll} 10s linear infinite;
    animation-play-state: paused;
  }

  .scroll-text.no-music {
    animation: none;
    color: gray;
  }

  // 볼륨 및 재생 버튼
  .HomeMusicRight_volume-control {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
  .HomeMusicRight_volBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
  .control-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;

    .HomeMusicRight_startbtn {
      color: ${({ theme }) => theme.colors.mainColor};
    }
  }
  // 재생버튼
  button {
    color: gray;
    background-color: transparent;
    border: none;
    font-size: 10px;
    cursor: pointer;
    width: 12px;
  }

  .HomeMusicRight_volume-control input {
    margin-top: 2px;
    width: 55%; /* 슬라이더 너비 */
    height: 4px; /* 트랙의 높이 */
    border-radius: 5px;
    outline: none;
    transition: background 450ms ease-in;
    -webkit-appearance: none;
    accent-color: #ffca1d; /* 슬라이더 thumb의 색상 */
  }

  .HomeMusicRight_volume-control input::-webkit-slider-runnable-track {
    height: 8px;
    border-radius: 8px;
  }

  .HomeMusicRight_volume-control input::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px; /* thumb의 너비 */
    height: 8px; /* thumb의 높이 */
    background-color: rgb(255, 244, 206); /* 주황색 */
    border-radius: 50px;
    border: 1.5px solid #bbb;
    cursor: pointer;
  }

  .HomeMusicRight_volume-control input::-moz-range-track {
    height: 8px;
    border-radius: 8px;
  }

  .HomeMusicRight_volume-control input::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background-color: #ffca1d;
    border-radius: 50%;
    cursor: pointer;
  }

  .HomeMusicRight_volume-control input::-ms-track {
    height: 8px;
    border-radius: 8px;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  .HomeMusicRight_volume-control input::-ms-thumb {
    width: 20px;
    height: 20px;
    background-color: #ffca1d;
    border-radius: 50%;
    cursor: pointer;
  }
`;
