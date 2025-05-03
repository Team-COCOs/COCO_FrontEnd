import styled from "styled-components";

export const HomeTabStyled = styled.div`
  width: 100%;
  height: 67%;
  .HomeTab_wrap {
  }
  .HomeTab_number_title {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 8px 0px;
    min-height: 32.5px;
    width: 75%;
    font-size: 10.5px;
    font-weight: bolder;
    background-color: ${({ theme }) => theme.colors.tabColor};
    margin-bottom: 3.5px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top: 1px solid;
    border-bottom: 1px solid;
    border-right: 1px solid;
    border-color: #064d6c;
    cursor: pointer;
  }
  .HomeTab_item.active {
    background-color: #ffffff;
    color: black;
  }
`;
