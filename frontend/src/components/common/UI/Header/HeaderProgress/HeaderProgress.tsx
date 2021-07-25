import React from "react";
import styled, { css } from "styled-components";

type Props = {
  scroll: number;
};

const HeaderProgress: React.FC<Props> = ({ scroll }) => {
  return (
    <Container>
      <Progress $scroll={scroll} />
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: -4px;
  height: 4px;
  z-index: 100;
`;

const Progress = styled.div<{ $scroll: number }>`
  background: ${({ theme }) => theme.color.ftColor2};
  transform-origin: top left;
  transform: scale(0, 0);
  height: 4px;
  ${(props) => css`
    transform: scale(${props.$scroll}, 1);
  `};
`;

export default HeaderProgress;
