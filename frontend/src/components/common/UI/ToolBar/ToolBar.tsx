import React, { memo } from "react";
import styled from "styled-components";
import {
  FaHeading,
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaQuoteRight,
  FaLink,
  FaCode,
  FaImage,
} from "react-icons/fa";

import InputLink from "./InputLink";

import useToolBar from "hooks/common/useToolBar";

type Props = {
  contentEl: React.MutableRefObject<HTMLTextAreaElement>;
  onChange: (name: string, value: any) => void;
};

const ToolBar: React.FC<Props> = ({ contentEl, onChange }) => {
  const {
    imageEl,
    clickEl,
    linkEl,
    linkInputEl,
    isInputMount,
    link,
    handleChangeImage,
    handleChangeLink,
    handleSubmitLink,
    handleKeyDownLink,
    handleTools,
  } = useToolBar(contentEl, onChange);

  return (
    <Container>
      {[1, 2, 3, 4].map((scale, idx) => (
        <HeadingButton key={idx} onClick={() => handleTools("heading", scale)}>
          <Heading>
            <FaHeading />
            <HeadingNumber>{scale}</HeadingNumber>
          </Heading>
        </HeadingButton>
      ))}

      <Divide />

      <CommonButton onClick={() => handleTools("bold")}>
        <FaBold />
      </CommonButton>

      <CommonButton onClick={() => handleTools("italic")}>
        <FaItalic />
      </CommonButton>

      <CommonButton onClick={() => handleTools("strike")}>
        <FaStrikethrough />
      </CommonButton>

      <Divide />

      <CommonButton onClick={() => handleTools("blockquote")}>
        <FaQuoteRight />
      </CommonButton>

      <LinkWrapper ref={clickEl}>
        <CommonButton onClick={() => handleTools("link")}>
          <FaLink />
        </CommonButton>

        {isInputMount && (
          <InputLink
            linkEl={linkEl}
            linkInputEl={linkInputEl}
            link={link}
            onChange={handleChangeLink}
            onClick={handleSubmitLink}
            onKeyDown={handleKeyDownLink}
          />
        )}
      </LinkWrapper>

      <CommonButton onClick={() => handleTools("codeblock")}>
        <FaCode />
      </CommonButton>

      <LabelButton htmlFor="image">
        <FaImage />
      </LabelButton>

      <ImageInput
        id="image"
        type="file"
        accept="image/png, image/jpeg, image/gif"
        ref={imageEl}
        onChange={(e) => handleChangeImage(e)}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0.2rem 0;
`;

const Divide = styled.span`
  height: auto;
  border: 1px solid ${({ theme }) => theme.color.bgColor5};
  margin: 0.5rem 0.5rem;
`;

const ImageInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const LinkWrapper = styled.div`
  position: relative;
`;

const HeadingButton = styled.button`
  cursor: pointer;
  padding: 0.65rem;
  border: none;
  outline: none;
  background-color: transparent;
  border-radius: 0.2rem;

  &:hover {
    background-color: ${({ theme }) => theme.color.bgColor2};
  }
`;

const CommonButton = styled(HeadingButton)`
  & > svg {
    color: ${({ theme }) => theme.color.ftColor4};
    font-size: 1.025rem;
  }
`;

const Heading = styled.div`
  display: flex;

  & > svg {
    color: ${({ theme }) => theme.color.ftColor4};
    font-size: 1.025rem;
  }
`;

const HeadingNumber = styled.p`
  font-weight: bold;
  color: ${({ theme }) => theme.color.ftColor4};
`;

const LabelButton = styled.label`
  cursor: pointer;
  padding: 0.65rem;
  border: none;
  outline: none;
  background-color: transparent;
  border-radius: 0.2rem;

  &:hover {
    background-color: ${({ theme }) => theme.color.bgColor2};
  }

  & > svg {
    color: ${({ theme }) => theme.color.ftColor4};
    font-size: 1.025rem;
  }
`;

export default memo(ToolBar);
