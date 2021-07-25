import styled, { css } from "styled-components";
import { fadeIn } from "styles/animation";

export const HandleWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  ${fadeIn("0.5s")}

  ::selection {
    background-color: ${({ theme }) => theme.color.bgColor5};
  }
`;

export const HandleContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  overflow-y: hidden;
`;

export const HandleWrite = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  overflow-y: hidden;
  background-color: ${({ theme }) => theme.color.bgColor};

  ${({ theme }) => theme.media.tablet} {
    width: 100%;
  }
`;

export const HandleWriteHeader = styled.div<{ $active: boolean }>`
  width: 100%;
  padding: 3rem 2rem 0rem;
  display: block;

  ${(props) =>
    props.$active &&
    css`
      top: 0;
      border-bottom: 1px solid ${({ theme }) => theme.color.bdColor};
    `}
`;

export const HandleWriteToolBar = styled.div<{ $active: boolean }>`
  padding: 0 2rem;

  ${(props) =>
    props.$active &&
    css`
      display: none;
    `}
`;

export const HandleInputTitle = styled.textarea`
  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  font-weight: bold;
  font-size: 2.225rem;
  color: ${({ theme }) => theme.color.ftColor};
  font-family: inherit;
  resize: none;

  &::placeholder {
    font-weight: bold;
    font-size: 2.225rem;
    color: ${({ theme }) => theme.color.ftColor5};
    font-family: inherit;
  }
`;

export const HandleInputTitleBottomLine = styled.div`
  width: 100%;
  height: 1px;
  margin: 1rem 0;
  background-color: ${({ theme }) => theme.color.bdColor};
`;
