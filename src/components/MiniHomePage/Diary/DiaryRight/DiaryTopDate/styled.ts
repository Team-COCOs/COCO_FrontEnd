import styled from "styled-components";

export const DiaryTopDateStyle = styled.div`
  position: relative;
  .DiaryTopDate_wrap {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1.5px solid #ddd;

    height: 50px;
    z-index: 2;
    background-color: white;
  }

  .DiaryTopDate_dateWrap {
    .DiaryTopDate_dateMM {
      color: ${({ theme }) => theme.colors.tabColor};
      font-weight: bolder;
      position: relative;
      z-index: 2;
    }
    .DiaryTopDate_dateEE {
    }
  }
  button,
  div {
    position: relative;
    z-index: 2;
  }
`;
