import React from "react";
import styled from "styled-components";
import { FaSave } from "react-icons/fa";
import { ImExit } from "react-icons/im";

type Props = {
  clickEl: React.MutableRefObject<HTMLDivElement>;
  admin: boolean;
  onClickItem: (path: string) => void;
  onClickLogout: () => void;
};

const HeaderProfileMenu: React.FC<Props> = ({
  clickEl,
  admin,
  onClickItem,
  onClickLogout,
}) => {
  return (
    <Container ref={clickEl}>
      {admin && (
        <Item onClick={() => onClickItem("/temp")}>
          <IconWrapper>
            <FaSave />
          </IconWrapper>
          <Text>임시 글</Text>
        </Item>
      )}
      <Item onClick={onClickLogout}>
        <IconWrapper>
          <ImExit />
        </IconWrapper>
        <Text>로그아웃</Text>
      </Item>
    </Container>
  );
};

const Container = styled.div`
  top: 3.2rem;
  left: 3.4rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 0.6rem rgba(0, 0, 0, 0.15);
  background: ${({ theme }) => theme.color.bgColor};
  width: 12rem;
  height: auto;
  position: absolute;
  border-radius: 0.2rem;

  &:after,
  &:before {
    bottom: 100%;
    left: 25%;
    border: solid transparent;
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  &:after {
    border-color: rgba(163, 163, 163, 0);
    border-bottom-color: ${({ theme }) => theme.color.bgColor};
    border-width: 10px;
    margin-left: -10px;
  }
  &:before {
    border-color: rgba(162, 162, 162, 0);
    border-bottom-color: ${({ theme }) => theme.color.bdColor};
    border-width: 12px;
    margin-left: -12px;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.55rem 0.8rem;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: ${({ theme }) => theme.color.bgColor3};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.bdColor};
  margin-right: 0.6rem;

  & > svg {
    font-size: 1.125rem;
    color: ${({ theme }) => theme.color.ftColor2};
  }
`;

const Text = styled.p`
  font-size: 1rem;
  font-weight: normal;
  color: ${({ theme }) => theme.color.ftColor};
`;

export default HeaderProfileMenu;
