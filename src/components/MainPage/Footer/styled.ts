import styled from "styled-components";

export const FooterStyled = styled.footer`
  width: 100%;
  text-align: center;
  font-size: 12px;
  color: #666666;
  padding: 30px 10px;
  border-top: 1px solid #eee;
  margin-top: 30px;

  .Footer_logoRow {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    margin-bottom: 15px;

    .Footer_logo1 {
      position: relative;
      width: 100px;
      height: 50px;
    }

    .Footer_logo2 {
      position: relative;
      width: 100px;
      height: 20px;
    }

    .Footer_logo3 {
      position: relative;
      width: 100px;
      height: 40px;
    }

    .Footer_logo4 {
      position: relative;
      width: 100px;
      height: 30px;
    }
  }

  .Footer_links {
    margin-bottom: 10px;

    a {
      margin: 0 4px;
      text-decoration: none;
    }

    span {
      margin: 0 3px;
      color: rgb(181, 181, 181);
    }
  }

  .Footer_copy {
    color: rgb(151, 151, 151);
    font-size: 11px;
  }
`;
