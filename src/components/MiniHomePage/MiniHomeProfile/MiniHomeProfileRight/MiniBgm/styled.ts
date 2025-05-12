import styled from "styled-components";

export const MiniBgmStyle = styled.div`
  &.MiniBgm_wrap {
    display: flex;
    flex-direction: column;
    padding-top: 10px;

    button {
      padding: 0 5px;
      background: linear-gradient(to bottom, #ffffff, #dddddd);
      border: 1px solid #000000;
      border-radius: 3px;

      &:active {
        background: linear-gradient(to top, #ffffff, #dddddd);
      }
    }

    .MiniBgm_title {
      color: #4b4b4b;
      font-size: 12px;
      font-weight: bolder;
      padding-bottom: 7px;
      border-bottom: 1.5px dotted #ddd;
      margin-bottom: 7px;
    }

    .MiniBgm_btn {
      display: flex;
      justify-content: space-between;
      padding: 10px;
    }

    .MiniBgm_footer {
      display: flex;
      gap: 10px;
      align-items: center;
      justify-content: center;

      select {
        width: 60px;
        height: 25px;
      }

      input {
        width: 150px;
        height: 25px;
        padding: 5px;

        &:active,
        &:focus {
          outline: none;
        }
      }

      button {
        height: 25px;
      }
    }
  }
`;
