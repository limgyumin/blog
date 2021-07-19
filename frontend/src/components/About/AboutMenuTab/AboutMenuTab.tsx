import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

type AboutMenuTabProps = {
  isPolicy: boolean;
};

const AboutMenuTab: FC<AboutMenuTabProps> = ({ isPolicy }) => {
  return (
    <AboutMenuTabWrapper>
      <AboutMenuTabContainer>
        <AboutMenuTabItem to="/about">
          <AboutMenuTabItemText active={!isPolicy}>블로그</AboutMenuTabItemText>
        </AboutMenuTabItem>
        <AboutMenuTabItem to="/about?type=policy">
          <AboutMenuTabItemText active={isPolicy}>
            개인정보 처리방침
          </AboutMenuTabItemText>
        </AboutMenuTabItem>
        <AboutMenuTabBottom active={isPolicy} />
      </AboutMenuTabContainer>
    </AboutMenuTabWrapper>
  );
};

const AboutMenuTabWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const AboutMenuTabContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const AboutMenuTabItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: color ease 0.2s;
  width: 12rem;
  margin-bottom: 0.8rem;
`;

const AboutMenuTabItemText = styled.h2<{ active: boolean }>`
  font-size: 1.225rem;
  font-weight: normal;
  color: ${(props) =>
    props.active
      ? ({ theme }) => theme.color.ftColor
      : ({ theme }) => theme.color.bgColor1};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
`;

const AboutMenuTabBottom = styled.div<{ active: boolean }>`
  width: 50%;
  height: 2px;
  position: absolute;
  bottom: 0;
  background-color: ${({ theme }) => theme.color.ftColor};
  transition: transform ease 0.4s;
  transform: ${(props) =>
    props.active ? "translateX(12rem)" : "translateX(0)"};
`;

export default AboutMenuTab;
