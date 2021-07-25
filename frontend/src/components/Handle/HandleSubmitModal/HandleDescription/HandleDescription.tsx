import React from "react";
import styled from "styled-components";

type Props = {
  description: string;
  onChange: (name: string, value: any) => void;
};

const HandleDescription: React.FC<Props> = ({ description, onChange }) => {
  return (
    <Container>
      <Title>소개</Title>
      <Content
        value={description}
        name="description"
        placeholder="소개를 작성해주세요."
        onChange={({ target: { name, value } }) => onChange(name, value)}
      />
    </Container>
  );
};

const Container = styled.div`
  margin-top: 1rem;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 1.025rem;
  color: ${({ theme }) => theme.color.ftColor3};
  margin-bottom: 0.8rem;
`;

const Content = styled.textarea`
  width: 100%;
  height: 5rem;
  outline: none;
  resize: none;
  padding: 0.6rem;
  border: 1px solid ${({ theme }) => theme.color.bgColor5};
  border-radius: 0.2rem;
  background-color: ${({ theme }) => theme.color.bgColor3};
  font-family: inherit;
  font-size: 0.925rem;
  font-weight: normal;
  color: ${({ theme }) => theme.color.ftColor1};

  &::placeholder {
    font-weight: normal;
    font-size: 0.925rem;
    color: ${({ theme }) => theme.color.ftColor5};
  }
`;

export default HandleDescription;
