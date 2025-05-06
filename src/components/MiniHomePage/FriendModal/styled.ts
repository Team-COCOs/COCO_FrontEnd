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
  /* 반응형 */
  @media (max-width: 1024px) {
    &.FriendModal_window {
      right: 5%;
    }
  }
  @media (max-width: 769px) {
    &.FriendModal_window {
      right: 3%;
    }
  }
  @media (max-width: 480px) {
    &.FriendModal_window {
      right: -2%;
    }
  }
  @media (max-width: 386px) {
    &.FriendModal_window {
      right: -15%;
      font-size: 8px;
    }
  }
`;
