import React, { FC } from "react";
import styled from "styled-components";
import { fadeIn, fadeOut, moveDown, moveUp } from "styles/animation";
import DelayUnmount from "../../HOC/DelayUnmount";
import ThemeWrapper from "../../HOC/ThemeWrapper";

type ModalProps = {
  isMount: boolean;
  children: React.ReactNode;
};

const Modal: FC<ModalProps> = ({ isMount, children }) => {
  return (
    <DelayUnmount delay={500} isMount={isMount}>
      <ThemeWrapper>
        <ModalWrapper>
          <ModalOverlay $active={isMount} />
          <ModalBox $active={isMount}>{children}</ModalBox>
        </ModalWrapper>
      </ThemeWrapper>
    </DelayUnmount>
  );
};

const ModalWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: hidden;
`;

const ModalOverlay = styled.div<{ $active: boolean }>`
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

const ModalBox = styled.div<{ $active: boolean }>`
  position: relative;
  background-color: ${({ theme }) => theme.color.bgColor};
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.2rem;
  overflow: hidden;
  ${(props) =>
    props.$active ? moveUp("100rem", "0.5s") : moveDown("100rem", "0.5s")}
`;

export default Modal;
