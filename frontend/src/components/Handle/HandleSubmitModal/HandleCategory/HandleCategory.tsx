import React from "react";
import styled from "styled-components";

import { BiBook } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";

import HandleCategoryList from "./HandleCategoryList";

import useFetchCategories from "hooks/category/useFetchCategories";
import usePostCategory from "hooks/post/usePostCategory";

type Props = {
  onChange: (name: string, value: any) => void;
};

const HandleCategory: React.FC<Props> = ({ onChange }) => {
  const { categories } = useFetchCategories();
  const {
    categoriesEl,
    clickEl,
    showCategories,
    selectedCategory,
    handleChangeCategory,
    handleShowCategories,
  } = usePostCategory(onChange);

  return (
    <Container>
      <Title>카테고리</Title>
      <SelectBox ref={clickEl} onClick={handleShowCategories}>
        <Wrapper>
          <BiBook />
          <CurrentCategory>
            {selectedCategory || "카테고리 선택"}
          </CurrentCategory>
        </Wrapper>
        <IoMdArrowDropdown />
      </SelectBox>
      {showCategories && (
        <HandleCategoryList
          categoriesEl={categoriesEl}
          categories={categories}
          onChange={handleChangeCategory}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 1rem;
  position: relative;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 1.025rem;
  color: ${({ theme }) => theme.color.ftColor3};
  margin-bottom: 0.8rem;
`;

const SelectBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.color.bgColor5};
  border-radius: 0.2rem;
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.color.bgColor};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.bgColor4};
  }

  & > svg {
    font-size: 1.225rem;
    color: ${({ theme }) => theme.color.ftColor3};
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.025rem;
  color: ${({ theme }) => theme.color.ftColor3};

  & > svg {
    margin-right: 0.4rem;
  }
`;

const CurrentCategory = styled.p`
  font-size: 0.925rem;
  font-weight: normal;
`;

export default HandleCategory;
