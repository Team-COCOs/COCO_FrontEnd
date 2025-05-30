import styled from "styled-components";

export const EmptyPageStyle = styled.div`
  &.EmptyPage_wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    .Empty_img {
      margin-top: 50px;
      position: relative;
      width: 300px;
      height: 300px;
    }

    .todayMiniImg {
      margin-top: -10px;
      position: relative;
      width: 130px;
      height: 130px;
    }

    .Bgm_img {
      margin-top: -35px;
      position: relative;
      width: 200px;
      height: 200px;
    }

    .Photo_img {
      margin-top: 20px;
      position: relative;
      width: 250px;
      height: 250px;
    }
  }
`;
