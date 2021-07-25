import React from "react";
import styled from "styled-components";
import { AiFillGithub } from "react-icons/ai";

import { OAUTH } from "config/config.json";

type Props = unknown;

const HeaderLogin: React.FC<Props> = () => {
  return (
    <LoginButton href={OAUTH}>
      <Icon />
    </LoginButton>
  );
};

const LoginButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 2.2rem;
  height: 2.2rem;
  margin-left: 0.3rem;
  background-color: ${({ theme }) => theme.color.ftColor};
  border-radius: 50%;
  box-shadow: none;
  transition: all ease-in-out 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.color.ftColor2};
  }

  &:active {
    box-shadow: 0 0 0.7rem 0 rgba(0, 0, 0, 0.2);
  }
`;

const Icon = styled(AiFillGithub)`
  font-size: 1.7rem;
  color: ${({ theme }) => theme.color.bgColor};
`;

export default HeaderLogin;
