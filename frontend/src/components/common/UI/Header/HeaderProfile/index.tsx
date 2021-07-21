import React, { FC } from "react";
import IUser from "types/user.type";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "components/common/UI/Button";

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
  const history = useHistory();

  return (
    <HeaderProfileWrapper>
      <HeaderProfileUser onClick={onClick} ref={menuEl}>
        <HeaderProfileAvatar src={profile.avatar} alt="Profile" />
      </HeaderProfileUser>
      {admin && (
        <React.Fragment>
          <HeaderProfileDivide />
          <Button shape="round" onClick={() => history.push("/write")}>
            글 쓰기
          </Button>
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

export default HeaderProfile;
