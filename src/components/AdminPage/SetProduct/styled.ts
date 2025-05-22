import styled from "styled-components";

export const SetProductStyled = styled.div`
  .SetProduct_wrap {
    margin-bottom: 10px;
    color: gray !important;
    h2 {
      padding-left: 2px;
      font-size: 13px;
      color: gray !important;
    }
  }
  .SetProduct_set_title {
    font-weight: bold;
    font-size: 25px;
  }
  .SetProduct_delete_btn {
    border: 1px solid ${({ theme }) => theme.colors.mainColor} !important;
    padding: 8px 12px;
    border-radius: 2px;
    cursor: pointer;
    font-size: 12px;
    font-weight: bolder;
    background-color: white;
    color: ${({ theme }) => theme.colors.mainColor} !important;
    &:hover {
      background-color: ${({ theme }) => theme.colors.mainColor} !important;
      color: white;
    }
  }
  :where(.css-dev-only-do-not-override-1m63z2v).ant-table-wrapper
    .ant-table-thead
    > tr
    > th,
  :where(.css-dev-only-do-not-override-1m63z2v).ant-table-wrapper
    .ant-table-thead
    > tr
    > td {
    text-align: center;
  }
  .ant-table-cell {
    text-align: center;
    img {
      width: auto !important;
      height: 55px !important;
    }
  }
`;
