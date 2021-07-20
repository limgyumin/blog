import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterContent>© 2021. limgyumin. All rights reserved.</FooterContent>
      </FooterContainer>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterContainer = styled.div`
  border-top: 1px solid ${({ theme }) => theme.color.bdColor};
  width: 100%;
  max-width: 1218px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 2rem 2.5rem 2rem;
`;

const FooterContent = styled.p`
  font-size: 0.925rem;
  color: ${({ theme }) => theme.color.ftColor5};
`;

export default Footer;
