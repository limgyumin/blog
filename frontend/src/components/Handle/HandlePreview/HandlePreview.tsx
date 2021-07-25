import React from "react";
import styled from "styled-components";

import MarkDown from "components/common/UI/MarkDown";

type Props = {
  title: string;
  content: string;
};

const HandlePreview: React.FC<Props> = ({ title, content }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <MarkDown>{content}</MarkDown>
    </Container>
  );
};

const Container = styled.div`
  width: 50%;
  height: 100%;
  overflow-y: auto;
  padding: 3rem 2rem 1rem;
  background-color: ${({ theme }) => theme.color.bgColor};
  border-left: 1px solid ${({ theme }) => theme.color.bdColor};

  ${({ theme }) => theme.media.tablet} {
    display: none;
  }
`;

const Title = styled.h1`
  word-break: break-all;
  font-weight: bold;
  font-size: 2.225rem;
  color: ${({ theme }) => theme.color.ftColor1};
  margin-bottom: 2.5rem;
`;

export default HandlePreview;
