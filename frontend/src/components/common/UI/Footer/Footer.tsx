import React from "react";
import styled from "styled-components";

type Props = unknown;

const Footer: React.FC<Props> = () => {
  return (
    <Container>
      <Wrapper>
        <Content>© 2021. limgyumin. All rights reserved.</Content>
      </Wrapper>
    </Container>
  );
};

const Container = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  border-top: 1px solid ${({ theme }) => theme.color.bdColor};
  width: 100%;
  max-width: 1218px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 2rem 2.5rem 2rem;
`;

const Content = styled.p`
  font-size: 0.925rem;
  color: ${({ theme }) => theme.color.ftColor5};
`;

export default Footer;
