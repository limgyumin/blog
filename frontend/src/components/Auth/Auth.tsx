import React, { memo } from "react";
import styled from "styled-components";
import { WaveSpinner } from "react-spinners-kit";

import useGitHubAuth from "hooks/auth/useGitHubAuth";
import useTheme from "hooks/util/useTheme";

type Props = unknown;

const Auth: React.FC<Props> = () => {
  const { isLight } = useTheme();
  const { loading } = useGitHubAuth();

  return (
    loading && (
      <Container>
        <Wrapper>
          <Title>로그인을 처리하는 중이에요!</Title>
          <Subtitle>
            조금만 기다려주세용...
            <span role="img" aria-label="person" aria-labelledby="person">
              🤤
            </span>
          </Subtitle>
          <WaveSpinner size={50} color={isLight ? "#c1c1c1" : "#b3b3b3"} />
        </Wrapper>
      </Container>
    )
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.2rem;
  color: ${({ theme }) => theme.color.ftColor};
`;

const Subtitle = styled.p`
  font-size: 1.6rem;
  font-weight: normal;
  color: ${({ theme }) => theme.color.ftColor};
  margin-bottom: 3rem;
`;

export default memo(Auth);
