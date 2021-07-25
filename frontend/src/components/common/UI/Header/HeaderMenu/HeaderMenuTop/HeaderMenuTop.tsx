import React from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

import { ReactComponent as LogoBlack } from "assets/images/logo_black.svg";

type Props = {
  onClickClose: () => void;
};

const HeaderMenuTop: React.FC<Props> = ({ onClickClose }) => {
  return (
    <Container>
      <LogoImage />
      <CloseButton onClick={onClickClose}>
        <IoMdClose />
      </CloseButton>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoImage = styled(LogoBlack)`
  width: auto;
  height: 2rem;

  & > path {
    fill: ${({ theme }) => theme.color.ftColor};
  }
`;

const CloseButton = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;

  & > svg {
    color: ${({ theme }) => theme.color.ftColor4};
    font-size: 2rem;
  }
`;

export default HeaderMenuTop;
