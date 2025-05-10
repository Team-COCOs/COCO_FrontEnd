import styled from "styled-components";

export const MinimiSetStyled = styled.div`
  width: 100%;
  .MinimiSet_purchase {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .MinimiSet_titleWrap {
    display: flex;
    flex-direction: column;
    padding-top: 10px;
  }
  .MinimiSet_wrap_title {
    color: #4b4b4b;
    font-size: 12px;
    font-weight: bolder;
    padding-bottom: 7px;
    border-bottom: 1.5px dotted #ddd;
    margin-bottom: 7px;
  }
  .MinimiSet_blue_title {
    color: #2686a3;
    font-size: 12px;
    font-weight: bolder;
    padding-bottom: 7px;
  }
  .MinimiSet_wrap_title2 {
    color: rgb(129, 129, 129);
    font-size: 11px;
    font-weight: bolder;
    padding-bottom: 15px;
  }
  .MinimiSet_minimi_name {
    color: #4b4b4b;
    font-size: 11px;
    font-weight: bolder;
    padding-bottom: 15px;
  }
  .MinimiSet_now_minimi {
    margin-bottom: 15px;
  }
  .MinimiSet_choice_wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 25px;
  }
  .MinimiSet_minimi_imgWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 85px;
    width: 85px;
    aspect-ratio: 1/1;
    img {
      width: 80%;
      height: 80%;
      object-fit: contain;
    }
  }
  .MinimiSet_minimi_imgWrap.nowminimi {
    margin-top: 10px;
    background-color: rgb(233, 233, 233);
  }

  // 버튼 css
  .MinimiSet_saveBtn_wrap {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  .MinimiSet_saveBtn {
    margin-top: 10px;
    padding: 4px 5px;
    background-color: rgb(248, 248, 248);
    color: #4b4b4b;
    font-size: 11px;
    border: 1px solid #4b4b4b;
    border-radius: 2px;
    cursor: pointer;
    font-weight: bold;

    &:hover {
      background-color: rgb(230, 230, 230);
    }
  }
`;
