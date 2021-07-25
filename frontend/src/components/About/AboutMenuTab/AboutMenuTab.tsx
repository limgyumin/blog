import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

type Props = {
  isPolicy: boolean;
};

const AboutMenuTab: React.FC<Props> = ({ isPolicy }) => {
  return (
    <Container>
      <Wrapper>
        <Item to="/about">
          <Text $active={!isPolicy}>블로그</Text>
        </Item>
        <Item to="/about?type=policy">
          <Text $active={isPolicy}>개인정보 처리방침</Text>
        </Item>
        <Bottom $active={isPolicy} />
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Item = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: color ease 0.2s;
  width: 12rem;
  margin-bottom: 0.8rem;
`;

const Text = styled.h2<{ $active: boolean }>`
  font-size: 1.225rem;
  font-weight: normal;

  ${(props) =>
    props.$active
      ? css`
          color: ${({ theme }) => theme.color.ftColor};
          font-weight: bold;
        `
      : css`
          color: ${({ theme }) => theme.color.bgColor1};
          font-weight: normal;
        `};
`;

const Bottom = styled.div<{ $active: boolean }>`
  width: 50%;
  height: 2px;
  position: absolute;
  bottom: 0;
  background-color: ${({ theme }) => theme.color.ftColor};
  transition: transform ease 0.4s;

  ${(props) =>
    props.$active
      ? css`
          transform: translateX(12rem);
        `
      : css`
          transform: translateX(0);
        `};
`;

export default AboutMenuTab;
