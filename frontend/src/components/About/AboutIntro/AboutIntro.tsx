import React from "react";
import styled from "styled-components";

import { ReactComponent as Laptop } from "assets/images/laptop.svg";
import { ReactComponent as Bulb } from "assets/images/bulb.svg";

type Props = unknown;

const AboutIntro: React.FC<Props> = () => {
  return (
    <Container>
      <Section>
        <Wrapper>
          <LaptopImage />
          <Content>
            <Title>
              다양한 분야의
              <br />
              기술 지식을 공유
            </Title>
            <Subtitle>
              프론트엔드 분야뿐만 아닌 백엔드 분야 및<br />
              디자인 분야의 지식을 공유하며 소통합니다.
            </Subtitle>
          </Content>
        </Wrapper>
      </Section>
      <Section>
        <Wrapper>
          <BulbImage />
          <Content>
            <Title>
              부족한 레퍼런스도
              <br />
              노네임드에서
            </Title>
            <Subtitle>
              쉽게 레퍼런스를 찾기 어려운 기술 지식들을
              <br />
              보다 간단히 찾을 수 있도록 공유합니다.
            </Subtitle>
          </Content>
        </Wrapper>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Section = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.bgColor3};
  padding: 6rem 0;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 850px;
  display: flex;
  justify-content: space-between;
`;

const LaptopImage = styled(Laptop)`
  width: auto;
  height: 20rem;
`;

const BulbImage = styled(Bulb)`
  width: auto;
  height: 20rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 380px;
  margin-top: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2.325rem;
  font-weight: bold;
  color: ${({ theme }) => theme.color.ftColor};
  margin-bottom: 1.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  font-weight: normal;
  color: ${({ theme }) => theme.color.ftColor};
`;

export default AboutIntro;
