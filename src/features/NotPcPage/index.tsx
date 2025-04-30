import { NotPcStyled } from "./styled";
import React from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Result, Typography } from "antd";

const { Paragraph, Text } = Typography;

const NotPc = () => {
  return (
    <NotPcStyled>
      <Result
        status="error"
        title="안내사항"
        subTitle={
          <>
            관리자 콘텐츠 특성 상<br />
            모바일 버전을 제공하지 않습니다. <br />
            PC에서 접속해 주세요.
          </>
        }
        extra={[]}
      >
        <div className="desc">
          <Paragraph>
            <Text
              strong
              style={{
                fontSize: 20,
              }}
            >
              관리자 페이지 안내
            </Text>
          </Paragraph>
          <Paragraph>
            <CloseCircleOutlined className="site-result-demo-error-icon" />{" "}
            관리자 페이지는 모바일에서 지원 하지 않습니다.
          </Paragraph>
          <Paragraph>
            <CloseCircleOutlined className="site-result-demo-error-icon" />{" "}
            콘텐츠 특성상 PC로 접속해 주세요.
          </Paragraph>
        </div>
      </Result>
    </NotPcStyled>
  );
};
export default NotPc;
