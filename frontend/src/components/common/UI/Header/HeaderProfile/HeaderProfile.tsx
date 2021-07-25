import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import Button from "components/common/UI/Buttons/Button";

import IUser from "types/user.type";

type Props = {
  menuEl: React.MutableRefObject<HTMLDivElement>;
  admin: boolean;
  profile: IUser;
  onClick: () => void;
};

const HeaderProfile: React.FC<Props> = ({
  menuEl,
  admin,
  profile,
  onClick,
}) => {
  const history = useHistory();

  return (
    <Container>
      <Profile onClick={onClick} ref={menuEl}>
        <Avatar src={profile.avatar} alt="Profile" />
      </Profile>
      {admin && (
        <>
          <Divide />
          <Button shape="round" onClick={() => history.push("/write")}>
            글 쓰기
          </Button>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-left: 0.3rem;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Avatar = styled.img`
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.color.bgColor5};
`;

const Divide = styled.div`
  width: 1px;
  margin: 0 1.3rem;
  height: 0.8rem;
  background-color: ${({ theme }) => theme.color.bgColor1};
`;

export default HeaderProfile;
