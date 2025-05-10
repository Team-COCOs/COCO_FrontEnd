import styled from "styled-components";

export const MakeMiniroomStyled = styled.div`
  width: 100%;
  .MakeMiniroom_titleWrap {
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    font-size: 12px;
    color: #2686a3;
    font-weight: bolder;
    padding-bottom: 7px;
  }
  /* 미니미 */
  .MakeMiniroom_product-minimiitem {
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: center;
    align-items: center;
  }
  .MakeMiniroom_product-minimiitem img {
    width: 80%;
    height: auto;
    aspect-ratio: 1/1;
    object-fit: contain;
  }
  .MakeMiniroom_buyItems_wrap {
    padding: 15px 0px;
  }
  .grid-miniroom {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .grid-minimi {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  /* 미니룸 */
  .MakeMiniroom_productWrap_miniroom {
  }
  .MakeMiniroom_product-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: center;
    align-items: center;
  }
  .MakeMiniroom_product-item img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
  /* 구매 상품 탭 */
  .MakeMiniroom_buyItems_tabs {
    display: flex;
    justify-content: flex-end;
    gap: 5px;
  }

  /* 버튼 */
  .MakeMiniroom_saveBtn_wrap {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }
  .MakeMiniroom_saveBtn {
    margin-top: 10px;
    padding: 4px 5px;
    background-color: rgb(212, 238, 255);
    color: #4b4b4b;
    font-size: 11px;
    border: 1px solid #4b4b4b;
    border-radius: 2px;
    cursor: pointer;
    font-weight: bold;
    width: 38px;
    &:hover {
      background-color: rgb(176, 222, 253);
    }
  }

  .MakeMiniroom_deleteBtn {
    margin-top: 10px;
    padding: 4px 5px;
    background-color: rgb(248, 248, 248);
    color: #4b4b4b;
    font-size: 11px;
    border: 1px solid #4b4b4b;
    border-radius: 2px;
    cursor: pointer;
    font-weight: bold;
    width: 38px;
    &:hover {
      background-color: rgb(230, 230, 230);
    }
  }
  .MakeMiniroom_buyItems_miniroomtab.active,
  .MakeMiniroom_buyItems_minimitab.active {
    color: ${({ theme }) => theme.colors.mainColor};
  }

  .MakeMiniroom_buyItems_miniroomtab,
  .MakeMiniroom_buyItems_minimitab {
    cursor: pointer;
    font-size: 11.5px;
    font-weight: bold;
    color: #4b4b4b;
  }
`;
