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
    text-align: center;
    font-size: 15px;
    top: 120%;
    right: 10%;
    z-index: 1000;
  }
`;
