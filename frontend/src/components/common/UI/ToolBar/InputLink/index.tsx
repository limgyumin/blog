import React, { FC } from "react";
import styled from "styled-components";

type InputLinkProps = {
  linkEl: React.MutableRefObject<HTMLDivElement>;
  linkInputEl: React.MutableRefObject<HTMLInputElement>;
  link: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const InputLink: FC<InputLinkProps> = ({
  linkEl,
  linkInputEl,
  link,
  onChange,
  onClick,
  onKeyDown,
}) => {
  return (
    <InputLinkWrapper ref={linkEl}>
      <InputLinkTitle>링크 삽입하기</InputLinkTitle>
      <InputLinkInsert
        value={link}
        ref={linkInputEl}
        type="text"
        placeholder="링크를 입력해주세요."
        onChange={(e) => onChange(e)}
        onKeyDown={(e) => onKeyDown(e)}
      />
      <InputLinkSubmitWrapper>
        <InputLinkSubmit onClick={onClick}>완료</InputLinkSubmit>
      </InputLinkSubmitWrapper>
    </InputLinkWrapper>
  );
};

const InputLinkWrapper = styled.div`
  top: 3rem;
  right: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid ${({ theme }) => theme.color.bdColor};
  background: ${({ theme }) => theme.color.bgColor};
  width: 20rem;
  height: auto;
  position: absolute;
  border-radius: 0.2rem;
  padding: 1rem 1.2rem;

  ${({ theme }) => theme.media.smallDesktop`
    right: auto;
    left: 0;
  `}
`;

const InputLinkTitle = styled.h3`
  font-weight: bold;
  font-size: 1.125rem;
  color: ${({ theme }) => theme.color.ftColor1};
`;

const InputLinkInsert = styled.input`
  width: 100%;
  margin: 0.8rem 0;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 0.925rem;
  font-weight: normal;
  color: ${({ theme }) => theme.color.ftColor1};
  border-bottom: 1px solid ${({ theme }) => theme.color.bdColor};
  padding: 0.5rem 0;

  &::placeholder {
    color: ${({ theme }) => theme.color.ftColor5};
    font-family: inherit;
  }
`;

const InputLinkSubmitWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const InputLinkSubmit = styled.button`
  border: none;
  outline: none;
  background-color: ${({ theme }) => theme.color.ftColor1};
  color: ${({ theme }) => theme.color.bgColor};
  padding: 0.3rem 0.8rem;
  border-radius: 0.2rem;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.ftColor2};
  }
`;

export default InputLink;
