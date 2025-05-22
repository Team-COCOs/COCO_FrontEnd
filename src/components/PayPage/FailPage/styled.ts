import styled from "styled-components";

export const PaymentFailStyled = styled.div`
  background-color: white;
  color: black;

  .main-wrap-error {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 20px;

    .Fail_img {
      position: relative;
      width: 120px;
      height: 70px;
      margin-right: 10px;
    }

    .Fail_box {
      margin-top: -10px;
      width: 450px;
      height: 200px;
      border: 1px solid rgb(206, 206, 206);
      box-shadow: 0 4px 9px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      gap: 25px;
      justify-content: center;
      align-items: center;

      @media (max-width: 480px) {
        & {
          width: 400px;
        }
      }

      @media (max-width: 420px) {
        & {
          width: 300px;
        }
      }

      .Fail_text {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .Fail_line {
        width: 100%;
        height: 1px;
        background-color: rgb(222, 221, 221);
      }

      .Fail_btn {
        color: ${({ theme }) => theme.colors.mainColor};
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
`;
