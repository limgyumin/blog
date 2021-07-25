import React from "react";
import styled from "styled-components";

import HandleThumbnail from "./HandleThumbnail/HandleThumbnail";
import HandleTitlePreview from "./HandleTitlePreview/HandleTitlePreview";
import HandleDescription from "./HandleDescription/HandleDescription";
import HandleCategory from "./HandleCategory/HandleCategory";

import DelayUnmount from "components/common/HOC/DelayUnmount/DelayUnmount";
import ThemeWrapper from "components/common/HOC/ThemeWrapper/ThemeWrapper";
import Button from "components/common/UI/Buttons/Button/Button";

import { fadeIn, fadeOut, moveDown, moveUp } from "styles/animation";

type Props = {
  title: string;
  description: string;
  isMount: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  onChange: (name: string, value: any) => void;
};

const HandleSubmitModal: React.FC<Props> = ({
  title,
  description,
  isMount,
  onCancel,
  onSubmit,
  onChange,
}) => {
  return (
    <DelayUnmount delay={500} isMount={isMount}>
      <ThemeWrapper>
        <Container>
          <Overlay $active={isMount} onClick={onCancel} />
          <Box $active={isMount}>
            <Wrapper>
              <Header>
                <Title>작성 완료하기</Title>
                <Underline />
              </Header>
              <Contents>
                <Info>
                  <HandleTitlePreview title={title} />
                  <HandleCategory onChange={onChange} />
                  <HandleDescription
                    description={description}
                    onChange={onChange}
                  />
                </Info>
                <HandleThumbnail onChange={onChange} />
              </Contents>
              <Bottom>
                <Button
                  size="lg"
                  color="lightGray"
                  onClick={onCancel}
                  style={{ marginRight: "0.8rem" }}
                >
                  취소
                </Button>
                <Button size="lg" color="black" onClick={onSubmit}>
                  작성 완료
                </Button>
              </Bottom>
            </Wrapper>
          </Box>
        </Container>
      </ThemeWrapper>
    </DelayUnmount>
  );
};

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 100;
`;

const Overlay = styled.div<{ $active: boolean }>`
  width: 100%;
  height: inherit;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.color.olColor};
  ${(props) => (props.$active ? fadeIn("0.5s") : fadeOut("0.5s"))}
`;

const Box = styled.div<{ $active: boolean }>`
  position: relative;
  width: 100%;
  height: auto;
  background-color: ${({ theme }) => theme.color.bgColor};
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  overflow-y: auto;
  ${(props) =>
    props.$active ? moveUp("100vh", "0.5s") : moveDown("100vh", "0.5s")}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 800px;
  padding: 2rem 2rem 3rem;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h3`
  font-weight: bold;
  font-size: 1.125rem;
  color: ${({ theme }) => theme.color.ftColor};
`;

const Underline = styled.div`
  margin: 0.6rem 0;
  border-bottom: 2.5px solid ${({ theme }) => theme.color.ftColor};
  width: 70px;
`;

const Contents = styled.div`
  display: flex;
  margin: 1.7rem 0 3rem;
`;

const Info = styled.div`
  width: 100%;
  padding-right: 1.5rem;
  border-right: 1px solid ${({ theme }) => theme.color.bdColor};
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default HandleSubmitModal;
