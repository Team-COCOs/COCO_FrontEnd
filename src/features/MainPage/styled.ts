import styled from "styled-components";

export const MainPageStyled = styled.div`
  &.MainPage_wrap {
    display: flex;
    flex-direction: column;
    max-width: 1280px;
    margin: 0 auto;
    padding: 10px 20px 0 20px;

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
