import React from "react";
import styled from "styled-components";

import { ellipsis } from "styles/lib";
import IUser from "types/user.type";

type Props = {
  profile: IUser;
};

const HeaderMenuProfile: React.FC<Props> = ({ profile }) => {
  const { avatar, name, bio } = profile;

  return (
    <Container>
      <Avatar src={avatar} alt={avatar} />
      <Info>
        <Name>{name}</Name>
        <Bio>{bio}</Bio>
      </Info>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 3.4rem;
  height: 3.4rem;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.color.bgColor5};
  margin-right: 1rem;
`;

const Info = styled.div`
  width: 100%;
`;

const Name = styled.h3`
  font-size: 1.245rem;
  font-weight: bold;
  color: ${({ theme }) => theme.color.ftColor3};
  ${ellipsis(1)};
`;

const Bio = styled.p`
  font-size: 0.925rem;
  font-weight: normal;
  margin-top: 0.2rem;
  color: ${({ theme }) => theme.color.ftColor5};
  ${ellipsis(1)};
`;

export default HeaderMenuProfile;
