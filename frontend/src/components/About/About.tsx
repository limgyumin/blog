import React from "react";
import useAbout from "hooks/common/useAbout";
import AboutIntro from "./AboutIntro";
import AboutPolicy from "./AboutPolicy";
import ReactHelmet from "components/common/ReactHelmet";
import { THUMBNAIL_URL } from "config/config.json";
import styled from "styled-components";
import AboutMenuTab from "./AboutMenuTab";

const About = () => {
  const { isPolicy } = useAbout();

  return (
    <React.Fragment>
      <ReactHelmet
        title="About | Nonamed"
        description="개발자를 꿈꾸는 한 학생의 이야기"
        url="https://nonamed.blog/about/info"
        image={THUMBNAIL_URL}
      />
      <AboutBannerWrapper>
        <AboutBanner>
          <AboutTitle>
            한 어린 주니어 개발자의
            <br />
            기술과 일상을 담은 블로그
          </AboutTitle>
          <AboutSubtitle>
            노네임드는 한 어린 개발자의 삽질과 노력을 통해 얻은 지식들을
            <br />
            여러분들과 함께 나누며 소통하는 작은 기술 블로그입니다.
          </AboutSubtitle>
        </AboutBanner>
      </AboutBannerWrapper>
      <AboutMenuTab isPolicy={isPolicy} />
      <AboutContent>{isPolicy ? <AboutPolicy /> : <AboutIntro />}</AboutContent>
    </React.Fragment>
  );
};

const AboutBannerWrapper = styled.div`
  width: 100%;
  height: 530px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 3.2rem;

  ${({ theme }) => theme.media.tablet`
    height: 430px;
  `};

  ${({ theme }) => theme.media.mobile`
    height: 330px;
  `};
`;

const AboutBanner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
`;

const AboutTitle = styled.h1`
  font-size: 2.925rem;
  font-weight: bold;
  color: ${({ theme }) => theme.color.ftColor1};
  margin-bottom: 1.5rem;

  ${({ theme }) => theme.media.tablet`
    font-size: 2.225rem;
  `};

  ${({ theme }) => theme.media.mobile`
    font-size: 1.825rem;
  `};
`;

const AboutSubtitle = styled.h4`
  font-size: 1.525rem;
  font-weight: normal;
  color: ${({ theme }) => theme.color.ftColor1};

  ${({ theme }) => theme.media.tablet`
    font-size: 1.125rem;
  `};

  ${({ theme }) => theme.media.mobile`
    font-size: 0.925rem;
  `};
`;

const AboutContent = styled.div`
  margin-top: 4rem;
`;

export default About;
