import styled from "styled-components";

export const BKbuyStyled = styled.div`
  width: 100%;
  .BKbuy_wrap_title {
    color: #4b4b4b;
    font-size: 12px;
    font-weight: bolder;
    padding-bottom: 7px;
    border-bottom: 1.5px dotted #ddd;
    margin-bottom: 7px;
  }

  .BKbuy_miniTitle {
    color: black;
    font-size: 12px;
    font-weight: bolder;
    padding-bottom: 7px;
    padding-top: 7px;
  }
  .BKbuy_ex_text {
    display: flex;
    justify-content: flex-end;
    color: #4b4b4b;
    font-size: 10px;
    padding-top: 7px;
    width: 100%;
  }
  .BKbuy_setBox {
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
  }
  .BKbuy_title {
    color: black;
    font-size: 12px;
    font-weight: bolder;
    padding-bottom: 7px;
  }
  /* 버튼 */
  .BKbuy_btnWrap {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  .BKbuy_savebtn {
    margin-top: 10px;
    padding: 4px 5px;
    background-color: rgb(248, 248, 248);
    color: #4b4b4b;
    font-size: 11px;
    border: 1px solid #4b4b4b;
    border-radius: 2px;
    cursor: pointer;
    font-weight: bold;
  }
  label {
    margin-bottom: 5px;
    display: inline-block;
    padding-right: 5px;
    padding-left: 5px;
    font-size: 12px;
    color: #4b4b4b;
    font-weight: bolder;
  }
  input {
    margin-right: 5px;
    vertical-align: middle;
    margin-top: 10px;
  }
  .BKbuy_grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5px;
  }
  .BKbuy_bk_allwrap {
    .BKbuy_bk_grid {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .BKbuy_bk_imgwrap {
        width: 100%;
        aspect-ratio: 1/1;
        overflow: hidden;
        margin-top: 3px;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .BKbuy_bk_name {
    font-size: 10px;
    padding: 5px;
    margin-bottom: 15px;
  }
  @media (max-width: 1024px) {
    .BKbuy_grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 768px) {
    .BKbuy_grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;
