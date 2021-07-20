import React, { FC } from "react";
import IUser from "types/user.type";
import { Link } from "react-router-dom";
import styled from "styled-components";

type HeaderProfileProps = {
  menuEl: React.MutableRefObject<HTMLDivElement>;
  admin: boolean;
  profile: IUser;
  onClick: () => void;
};

const HeaderProfile: FC<HeaderProfileProps> = ({
  menuEl,
  admin,
  profile,
  onClick,
}) => {
  return (
    <HeaderProfileWrapper>
      <HeaderProfileUser onClick={onClick} ref={menuEl}>
        <HeaderProfileAvatar src={profile.avatar} alt="Profile" />
      </HeaderProfileUser>
      {admin && (
        <React.Fragment>
          <HeaderProfileDivide />
          <HeaderProfileWrite to="/write">글 쓰기</HeaderProfileWrite>
        </React.Fragment>
      )}
    </HeaderProfileWrapper>
  );
};

const HeaderProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-left: 0.3rem;
`;

const HeaderProfileUser = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const HeaderProfileAvatar = styled.img`
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.color.bgColor5};
`;

const HeaderProfileDivide = styled.div`
  width: 1px;
  margin: 0 1.3rem;
  height: 0.8rem;
  background-color: ${({ theme }) => theme.color.bgColor1};
`;

const HeaderProfileWrite = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.33rem 0.9rem;
  background-color: ${({ theme }) => theme.color.ftColor};
  font-size: 0.925rem;
  font-weight: bold;
  color: ${({ theme }) => theme.color.bgColor};
  border-radius: 2rem;
  cursor: pointer;
  box-shadow: none;
  transition: all ease-in-out 0.2s;
  text-decoration: none;

  &:hover {
    background-color: ${({ theme }) => theme.color.ftColor2};
  }

  &:active {
    box-shadow: 0 0 0.7rem 0 rgba(0, 0, 0, 0.4);
  }
`;

export default HeaderProfile;
