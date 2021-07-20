import React, { FC } from "react";
import styled, { css } from "styled-components";

type HeaderProgressProps = {
  scroll: number;
};

const HeaderProgress: FC<HeaderProgressProps> = ({ scroll }) => {
  return (
    <HeaderProgressWrapper>
      <HeaderProgressContainer $scroll={scroll} />
    </HeaderProgressWrapper>
  );
};

const HeaderProgressWrapper = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: -4px;
  height: 4px;
  z-index: 100;
`;

const HeaderProgressContainer = styled.div<{ $scroll: number }>`
  background: ${({ theme }) => theme.color.ftColor2};
  transform-origin: top left;
  transform: scale(0, 0);
  height: 4px;
  ${(props) => css`
    transform: scale(${props.$scroll}, 1);
  `};
`;

export default HeaderProgress;
