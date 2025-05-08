// styled.ts
import styled from "styled-components";

export const ModalStyle = styled.div`
  &.Modal_window {
    border: 2px solid black;
    background-color: white;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-size: 15px;
    top: 40%;
    left: 15%;
    /* transform: translate(-50%, -50%); */
    z-index: 1000;
  }
`;
