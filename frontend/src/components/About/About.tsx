import React from "react";
import styled from "styled-components";

import ReactHelmet from "components/common/UI/ReactHelmet";
import AboutIntro from "./AboutIntro";
import AboutPolicy from "./AboutPolicy";
import AboutMenuTab from "./AboutMenuTab";

import useAbout from "hooks/common/useAbout";
import { THUMBNAIL_URL } from "config/config.json";

type Props = unknown;

const About: React.FC<Props> = () => {
  const { isPolicy } = useAbout();

  return (
    <>
      <ReactHelmet
        title="About | Nonamed"
        description="개발자를 꿈꾸는 한 학생의 이야기"
        url="https://nonamed.blog/about/info"
        image={THUMBNAIL_URL}
      />
      <Container>
        <Banner>
          <Title>
            한 어린 주니어 개발자의
            <br />
            기술과 일상을 담은 블로그
          </Title>
          <Subtitle>
            노네임드는 한 어린 개발자의 삽질과 노력을 통해 얻은 지식들을
            <br />
            여러분들과 함께 나누며 소통하는 작은 기술 블로그입니다.
          </Subtitle>
        </Banner>
      </Container>
      <AboutMenuTab isPolicy={isPolicy} />
      <Content>{isPolicy ? <AboutPolicy /> : <AboutIntro />}</Content>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 530px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 3.2rem;

  ${({ theme }) => theme.media.tablet} {
    height: 430px;
  }

  ${({ theme }) => theme.media.mobile} {
    height: 330px;
  } ;
`;

const Banner = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.925rem;
  font-weight: bold;
  color: ${({ theme }) => theme.color.ftColor1};
  margin-bottom: 1.5rem;

  ${({ theme }) => theme.media.tablet} {
    font-size: 2.225rem;
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: 1.825rem;
  } ;
`;

const Subtitle = styled.h4`
  font-size: 1.525rem;
  font-weight: normal;
  color: ${({ theme }) => theme.color.ftColor1};

  ${({ theme }) => theme.media.tablet} {
    font-size: 1.125rem;
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: 0.925rem;
  } ;
`;

const Content = styled.div`
  margin-top: 4rem;
`;

export default About;
