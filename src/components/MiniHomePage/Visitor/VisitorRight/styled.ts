import styled from "styled-components";

/* 오른쪽 컴포넌트 기본 CSS 이부분 사용 */
export const VisitorRightStyled = styled.div`
  &.VisitorRight_wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 98%;
    height: 95%;
    word-wrap: break-word;
    word-break: break-word;
    overflow-wrap: break-word;
    white-space: normal;
    overflow-y: auto;
    overflow-x: hidden;

    .VisitorRight_header {
      width: 92%;
      height: 100%;
      padding-left: 10px;
    }

    @media (max-width: 1024px) {
      .VisitorRight_component_wrap {
        padding-left: 0px;
      }
    }
  }
`;
