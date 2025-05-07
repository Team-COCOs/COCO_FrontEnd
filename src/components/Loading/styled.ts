// components/styled.ts (또는 원하는 위치에)
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingStyle = styled.div`
  .Loading_Container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #fff0f5;
  }

  .Loading_imgContainer img {
    width: 120px;
    height: 120px;
    margin-bottom: 20px;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(255, 105, 180, 0.5);
  }

  .Loading_text {
    font-size: 1.5rem;
    color: #ff69b4;
    margin-bottom: 10px;
  }

  .Loading_text2 {
    font-size: 1rem;
    color: #c71585;
  }

  .Loading_spinner {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 3px solid #ff69b4;
    border-top-color: transparent;
    border-radius: 50%;
    margin-left: 10px;
    animation: ${spin} 1s linear infinite;
    vertical-align: middle;
  }
`;
