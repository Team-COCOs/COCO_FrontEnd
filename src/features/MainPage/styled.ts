import styled from "styled-components";

export const MainPageStyled = styled.div`
  &.MainPage_wrap {
    display: flex;
    flex-direction: column;
    max-width: 1280px;
    height: 100vh;
    margin: 0 auto;

    .MainPage_container {
      display: flex;
      gap: 5px;
      flex: 1;

      .MainPage_profile {
        width: 20%;
      }

      .MainPage_store {
        width: 80%;
      }
    }
  }
`;
