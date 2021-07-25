import React from "react";
import styled from "styled-components";

import { ellipsis } from "styles/lib";
import { ICategory } from "types/category.type";

type Props = {
  categoriesEl: React.MutableRefObject<HTMLDivElement>;
  categories: ICategory[];
  onChange: (category: ICategory) => void;
};

const HandleCategoryList: React.FC<Props> = ({
  categoriesEl,
  categories,
  onChange,
}) => {
  return (
    <Container ref={categoriesEl}>
      {categories.map((category) => (
        <Item key={category.idx} onClick={() => onChange(category)}>
          <Name>{category.name}</Name>
        </Item>
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-height: 8.5rem;
  overflow-y: auto;
  top: 4.8rem;
  left: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.color.bdColor};
  background: ${({ theme }) => theme.color.bgColor};
  position: absolute;
  border-radius: 0.2rem;
`;

const Item = styled.div`
  width: 100%;
  padding: 0.7rem 0.8rem;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.bgColor2};
  }
`;

const Name = styled.p`
  font-size: 1rem;
  font-weight: normal;
  color: ${({ theme }) => theme.color.ftColor};
  word-break: break-all;
  ${ellipsis(1)};
`;

export default HandleCategoryList;
