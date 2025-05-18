import styled from "styled-components";

export const GuestBookStyle = styled.div`
  &.GuestBook_wrap {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .GuestBook_header {
      display: flex;
      justify-content: space-between;
      background-color: rgb(247, 247, 247);
      border-top: 2.5px solid rgb(223, 223, 223);
    }
  }
`;
