import styled from "styled-components";

export const MainPageStyled = styled.div`
  width: 100%;
  overflow-x: auto;

  .MainPage_wrap {
    display: flex;
    flex-direction: column;
    width: 1280px;
    min-width: 1280px;
    margin: 0 auto;
    padding: 10px 25px 0 25px;

    @media (max-width: 1024px) {
      padding: 10px 50px 0 50px;
    }

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
