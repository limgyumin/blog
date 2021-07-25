import React from "react";
import styled, { css } from "styled-components";

import { WiMoonAltNew } from "react-icons/wi";
import { IoMdMoon } from "react-icons/io";

import useTheme from "hooks/util/useTheme";

type Props = unknown;

const ThemeButton: React.FC<Props> = () => {
  const { isLight, handleChangeTheme } = useTheme();

  return (
    <Container onClick={handleChangeTheme}>
      <Toggle $active={isLight}>
        {isLight ? <IoMdMoon /> : <WiMoonAltNew />}
      </Toggle>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 2.6rem;
  height: 1.2rem;
  border-radius: 2rem;
  border: 3px solid ${({ theme }) => theme.color.bgColor1};
  position: relative;
  transition: all ease 0.2s;
`;

const Toggle = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: ${({ theme }) => theme.color.ftColor1};
  border-radius: 50%;
  width: 1.75rem;
  height: 1.75rem;
  right: 1rem;
  transition: all ease 0.2s;
  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);

  ${(props) =>
    props.$active
      ? css`
          right: 1rem;
        `
      : css`
          right: -0.6rem;
        `}

  & > svg {
    color: ${({ theme }) => theme.color.bgColor};
  }
`;

export default ThemeButton;
