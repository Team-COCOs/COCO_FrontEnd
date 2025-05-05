// styled.ts
import styled from "styled-components";

export const FriendModalStyle = styled.div`
  &.FriendModal_window {
    border: 2px solid black;
    background-color: white;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 15px;
    top: 120%;
    right: 5%;
    z-index: 1000;
    background-color: #e2f0fc;
  }
`;
