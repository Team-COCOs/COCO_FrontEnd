import styled from "styled-components";

export const MainPageStyled = styled.div`
  &.MainPage_wrap {
    display: flex;
    flex-direction: column;
    max-width: 1280px;
    margin: 0 auto;

    .MainPage_container {
      display: flex;
      gap: 20px;

      .MainPage_profile {
        width: 20%;
        background-color: powderblue;
      }

      .MainPage_store {
        width: 80%;
        background-color: plum;
      }
    }
  }
`;
