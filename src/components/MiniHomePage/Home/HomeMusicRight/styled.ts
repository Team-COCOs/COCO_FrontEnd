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
    background-color: #eee;
    padding: 10px;
    border: 1px solid #888;
    width: 200px;
    font-family: "굴림", "Gulim", sans-serif;
    font-size: 11px;
  }

  .HomeMusicRight_number {
    font-weight: bold;
    margin-bottom: 4px;
  }

  .HomeMusicRight_player {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background-color: #f7f7f7;
    padding: 10px;
    border: 1px solid #ccc;
    text-align: center;
  }

  .HomeMusicRight_title {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    border-top: 1px dashed #aaa;
    border-bottom: 1px dashed #aaa;
    padding: 5px 0;
  }

  .scroll-text {
    display: inline-block;
    min-width: 100%;
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

  .control-buttons {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }

  button {
    font-size: 12px;
    background-color: white;
    border: 1px solid #999;
    cursor: pointer;
    padding: 5px 10px;
  }

  .HomeMusicRight_volume-control input {
    width: 35%; /* 슬라이더 너비 */
    height: 5px; /* 트랙의 높이 */
    border-radius: 8px;
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
