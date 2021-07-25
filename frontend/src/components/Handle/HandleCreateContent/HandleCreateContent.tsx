import React from "react";
import styled from "styled-components";

type Props = {
  contentEl: React.MutableRefObject<HTMLTextAreaElement>;
  content: string;
  onClick: () => void;
  onChange: (name: string, value: any) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
};

const HandleCreateContent: React.FC<Props> = ({
  contentEl,
  content,
  onClick,
  onChange,
  onKeyDown,
  onScroll,
}) => {
  return (
    <Container onClick={onClick} onScroll={(e) => onScroll(e)}>
      <Content
        ref={contentEl}
        value={content}
        name="content"
        placeholder="당신의 이야기를 들려주세요!"
        onChange={({ target: { name, value } }) => onChange(name, value)}
        onKeyDown={(e) => onKeyDown(e)}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1 1 0%;
  height: 100%;
  padding: 1rem 0 1.5rem;
  overflow-y: auto;
`;

const Content = styled.textarea`
  padding: 0 2rem 1rem;
  width: 100%;
  resize: none;
  border: none;
  outline: none;
  background-color: transparent;
  font-weight: normal;
  font-size: 1.125rem;
  font-family: inherit;
  line-height: 1.7;
  color: ${({ theme }) => theme.color.ftColor1};

  &::placeholder {
    font-family: inherit;
    font-weight: normal;
    font-size: 1.125rem;
    color: ${({ theme }) => theme.color.ftColor5};
    font-style: italic;
  }
`;

export default HandleCreateContent;
