import { styled } from "styled-components";

export const AdvertisingStyle = styled.div`
  &.Advertising_wrap {
    margin-top: 7px;

    // profile
    .Advertising_border {
      width: 100%;
      height: 200px;
      height: 220px;
      padding: 0 12px;
      border: 3px solid rgb(233, 233, 233);
      border-radius: 5px;

      .Advertising4 {
        position: relative;
        width: 100%;
        height: 140px;
        margin: 12px 0;
      }

      .Advertising_text {
        width: 100%;
        font-size: 14px;
        font-weight: bold;

        @media (max-width: 1054px) {
          font-size: 13px;
        }

        @media (max-width: 984px) {
          font-size: 12px;
        }
      }

      .Advertising_font {
        margin-top: 7px;
        font-size: 13px;
        color: rgb(210, 210, 210);

        @media (max-width: 1054px) {
          font-size: 12px;
        }

        @media (max-width: 984px) {
          font-size: 11px;
        }
      }
    }

    // search
    .Advertising6 {
      position: relative;
      top: -20px;
      right: -30px;
      width: 250px;
      height: 150px;
    }

    // store ads
    .Advertising7 {
      position: relative;
      width: 100%;
      height: 120px;
    }

    .Advertising1 {
      position: relative;
      width: 100%;
      height: 140px;
      margin-top: 5px;
    }

    .Advertising5 {
      position: relative;
      width: 100%;
      height: 180px;
    }
  }
`;
