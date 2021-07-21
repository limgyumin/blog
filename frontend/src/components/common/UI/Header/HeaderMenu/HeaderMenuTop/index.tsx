import React, { FC } from "react";
import { IoMdClose } from "react-icons/io";
import { ReactComponent as LogoBlack } from "assets/images/logo_black.svg";
import styled from "styled-components";

type HeaderMenuTopProps = {
  onClickClose: () => void;
};

const HeaderMenuTop: FC<HeaderMenuTopProps> = ({ onClickClose }) => {
  return (
    <HeaderMenuTopWrapper>
      <HeaderMenuTopLogo />
      <HeaderMenuTopClose onClick={onClickClose}>
        <IoMdClose />
      </HeaderMenuTopClose>
    </HeaderMenuTopWrapper>
  );
};

const HeaderMenuTopWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderMenuTopLogo = styled(LogoBlack)`
  width: auto;
  height: 2rem;

  & > path {
    fill: ${({ theme }) => theme.color.ftColor};
  }
`;

const HeaderMenuTopClose = styled.button`
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
