// styled.ts
import styled from "styled-components";

export const ModalStyle = styled.div`
  &.Modal_window {
    width: 300px;
    height: 100px;
    border: 2px solid black;
    background-color: white;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }
`;
