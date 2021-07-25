import React from "react";
import styled from "styled-components";

import { ellipsis } from "styles/lib";

type Props = {
  title: string;
};

const HandleTitlePreview: React.FC<Props> = ({ title }) => {
  return (
    <Container>
      <Title>제목</Title>
      <Content>{title}</Content>
    </Container>
  );
};

const Container = styled.div`
  padding-bottom: 0.6rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.bdColor};
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 1.025rem;
  color: ${({ theme }) => theme.color.ftColor3};
  margin-bottom: 0.8rem;
`;

const Content = styled.h1`
  font-weight: bold;
  font-size: 1.325rem;
  color: ${({ theme }) => theme.color.ftColor1};
  ${ellipsis(1)}
`;

export default HandleTitlePreview;
