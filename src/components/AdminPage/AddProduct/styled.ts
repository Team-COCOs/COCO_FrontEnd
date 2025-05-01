import styled from "styled-components";

export const AddProductStyled = styled.div`
  .AddProduct_wrap {
    width: 100%;
    h2 {
      padding-left: 2px;
      font-size: 13px;
      color: gray;
    }
  }

  .AddProduct_add_title {
    font-weight: bold;
    font-size: 25px;
  }
  // 폼 디자인
  .AddProduct_form_wrap {
    border-top: 1px solid #ddd;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    margin: 15px 0px;
    .AddProduct_labelInput_wrap {
      display: flex;
    }

    label {
      display: flex;
      align-items: center;
      width: 150px;
      min-height: 35px;
      padding: 0px 20px;
      font-size: 13px;
      background-color: ${({ theme }) => theme.colors.lightColor};
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      /* font-weight: bold; */
    }
    .form-error {
      color: red;
      font-size: 10px;
      margin-top: 4px;
      margin-left: 5px;
    }
    .AddProduct_input_wrap {
      min-height: 35px;
      width: calc(100% - 150px);
      padding: 5px;
      border-bottom: 1px solid #ddd;

      input,
      textarea,
      select {
        width: 100%;
        padding: 8px 10px;
        font-size: 12px;
        border: 1px solid #ddd;
        border-radius: 2px;
        outline: none;

        &:focus {
          border-color: ${({ theme }) => theme.colors.mainColor};
          box-shadow: 0 0 0 2px rgba(255, 132, 0, 0.2); // 주황색 계열 포커스 효과
        }
      }
    }
  }
  .AddProduct_btnWrap {
    display: flex;
    justify-content: center;
    button {
      background-color: ${({ theme }) => theme.colors.mainColor};
      color: white;
      padding: 8px 12px;
      border: none;
      border-radius: 2px;
      cursor: pointer;
      font-size: 12px;
      &:hover {
        background-color: #e67600; // 호버 시 더 진한 주황
      }
    }
  }
`;
