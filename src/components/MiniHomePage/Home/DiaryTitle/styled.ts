import styled from "styled-components";

export const DiaryTitleStyled = styled.div`
  width: 97%;
  .DiaryTitle_wrap {
    font-weight: 500;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: end;
    .DiaryTitle_number_title {
      color: ${({ theme }) => theme.colors.bookColor};
    }
    .DiaryTitle_plus_friend {
      font-size: 10px;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.mainColor};
      cursor: pointer;
      letter-spacing: -0.5px;
    }
  }
`;
