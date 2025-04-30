import styled from "styled-components";

export const CocoWorldPageStyled = styled.div`
  &.CocoWorldPage_wrap {
    display: flex;
    flex-direction: column;
    max-width: 1280px;
    height: 100vh;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.colors.mainPurple};
  }
`;
