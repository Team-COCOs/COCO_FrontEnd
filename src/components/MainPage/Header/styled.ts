import { styled } from "styled-components";

export const HeaderStyle = styled.div`
  &.Header_wrap {
    display: flex;
    align-items: center;
    width: 100%;

    .Header_logo {
      display: flex;
      justify-content: center;
      width: 20%;
    }

    .Header_search {
      display: flex;
      align-items: center;
      width: 80%;

      .Header_searchPart {
        width: 80%;
        display: flex;
        align-items: center;
      }
    }

    @media (max-width: 1100px) {
      width: 100%;

      .Header_ad {
        display: none;
      }
    }
  }
`;
