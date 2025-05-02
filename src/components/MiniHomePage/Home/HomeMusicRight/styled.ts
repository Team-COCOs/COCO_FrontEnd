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

  .volume-control {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .volume-control input {
    width: 100px;
    margin-top: 5px;
  }
`;
