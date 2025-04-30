import styled from "styled-components";

export const AdvertisingStyled = styled.div`
  .adBox {
    position: fixed;
    display: flex;
    flex-direction: column;
    z-index: 1000;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .closeBox {
      background-color: black;
      color: white;
      display: flex;
      justify-content: space-between;
      padding: 5px 10px;
      align-items: center;

      p,
      .closeBtn {
        cursor: pointer;
      }

      p {
        font-size: 13px;
      }

      .closeBtn {
        font-size: 15px;
      }
    }

    .adImgBox {
      cursor: pointer;

      .adImage {
        width: 500px;
        height: 480px;

        @media (max-width: 650px) {
          & {
            width: 400px;
            height: 400px;
          }
        }

        @media (max-width: 450px) {
          & {
            width: 300px;
            height: 300px;
          }
        }

        @media (max-width: 330px) {
          & {
            width: 200px;
            height: 200px;
          }
        }
      }
    }
  }
`;
