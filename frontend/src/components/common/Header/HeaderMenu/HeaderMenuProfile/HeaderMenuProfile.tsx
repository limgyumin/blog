import React, { FC } from "react";
import IUser from "types/user.type";
import styled from "styled-components";
import { ellipsis } from "styles/lib";

type HeaderMenuProfileProps = {
  profile: IUser;
};

const HeaderMenuProfile: FC<HeaderMenuProfileProps> = ({ profile }) => {
  const { avatar, name, bio } = profile;

  return (
    <HeaderMenuProfileWrapper>
      <HeaderMenuProfileAvatar src={avatar} alt={avatar} />
      <HeaderMenuProfileInfo>
        <HeaderMenuProfileName>{name}</HeaderMenuProfileName>
        <HeaderMenuProfileBio>{bio}</HeaderMenuProfileBio>
      </HeaderMenuProfileInfo>
    </HeaderMenuProfileWrapper>
  );
};

const HeaderMenuProfileWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderMenuProfileAvatar = styled.img`
  width: 3.4rem;
  height: 3.4rem;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.color.bgColor5};
  margin-right: 1rem;
`;

const HeaderMenuProfileInfo = styled.div`
  width: 100%;
`;

const HeaderMenuProfileName = styled.h3`
  font-size: 1.245rem;
  font-weight: bold;
  color: ${({ theme }) => theme.color.ftColor3};
  ${ellipsis(1)};
`;

const HeaderMenuProfileBio = styled.p`
  font-size: 0.925rem;
  font-weight: normal;
  margin-top: 0.2rem;
  color: ${({ theme }) => theme.color.ftColor5};
  ${ellipsis(1)};
`;

export default HeaderMenuProfile;
