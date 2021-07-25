import React from "react";
import styled from "styled-components";
import { FiArrowLeft } from "react-icons/fi";

import ThemeButton from "components/common/UI/ThemeButton";
import Button from "components/common/UI/Buttons/Button";

type Props = {
  valid: boolean;
  onCancel: () => void;
  onSave: () => void;
  onComplete: () => void;
};

const HandleBottom: React.FC<Props> = ({
  valid,
  onCancel,
  onSave,
  onComplete,
}) => {
  return (
    <Container>
      <ThemeButton />
      <Buttons>
        <CancelButton onClick={onCancel}>
          <FiArrowLeft />
        </CancelButton>
        <Button
          color="lightGray"
          disabled={!valid}
          size="lg"
          onClick={onSave}
          style={{ marginRight: "1rem" }}
        >
          임시저장
        </Button>
        <Button color="black" disabled={!valid} size="lg" onClick={onComplete}>
          작성하기
        </Button>
      </Buttons>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4rem;
  padding: 0 2rem;
  background-color: ${({ theme }) => theme.color.bgColor4};
  border-top: 1px solid ${({ theme }) => theme.color.bdColor};
`;

const Buttons = styled.div`
  display: flex;
`;

const CancelButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  outline: none;
  border-radius: 0.2rem;
  background-color: transparent;
  cursor: pointer;
  margin-right: 1rem;
  transition: all ease 0.1s;

  &:hover {
    background-color: ${({ theme }) => theme.color.bgColor5};
  }

  & > svg {
    font-size: 1.625rem;
    color: ${({ theme }) => theme.color.ftColor2};
  }
`;

export default HandleBottom;
