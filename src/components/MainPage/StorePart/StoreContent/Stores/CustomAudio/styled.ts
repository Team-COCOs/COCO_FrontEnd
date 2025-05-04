import styled from "styled-components";

export const CustomAudioStyle = styled.div`
  &.custom-audio-player {
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
  }

  .controls {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .pause-controls {
    margin: 3px 0;
  }

  button {
    background: none;
    border: none;
    font-size: 7.5px;
    cursor: pointer;

    &:active,
    &:focus {
      outline: none;
    }
  }

  .pause-btn {
    margin-right: 1px;
    font-size: 10px !important;
  }

  input[type="range"] {
    width: 100px;
    -webkit-appearance: none;
    appearance: none;
    background-color: #eee;
    height: 6px;
    border-radius: 5px;
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.colors.mainColor} var(--progress),
      rgb(221, 221, 221) var(--progress),
      rgb(221, 221, 221) 100%
    );
    outline: none;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: rgb(144, 144, 144);
    cursor: pointer;
  }

  input[type="range"]:active::-webkit-slider-thumb {
    background-color: rgb(100, 100, 100);
  }

  input[type="range"]:focus {
    outline: none;
  }
`;
