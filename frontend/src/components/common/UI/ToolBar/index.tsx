import React, { FC, memo } from "react";
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
import InputLink from "components/common/UI/ToolBar/InputLink";
import useToolBar from "hooks/common/useToolBar";
import styled from "styled-components";

type ToolBarProps = {
  contentEl: React.MutableRefObject<HTMLTextAreaElement>;
  onChange: (name: string, value: any) => void;
};

const ToolBar: FC<ToolBarProps> = ({ contentEl, onChange }) => {
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
    <ToolBarWrapper>
      {[1, 2, 3, 4].map((scale, idx) => (
        <ToolBarButton key={idx} onClick={() => handleTools("heading", scale)}>
          <ToolBarButtonHeading>
            <FaHeading />
            <ToolBarButtonNumber>{scale}</ToolBarButtonNumber>
          </ToolBarButtonHeading>
        </ToolBarButton>
      ))}

      <ToolBarDivide />

      <ToolBarCommonButton onClick={() => handleTools("bold")}>
        <FaBold />
      </ToolBarCommonButton>

      <ToolBarCommonButton onClick={() => handleTools("italic")}>
        <FaItalic />
      </ToolBarCommonButton>

      <ToolBarCommonButton onClick={() => handleTools("strike")}>
        <FaStrikethrough />
      </ToolBarCommonButton>

      <ToolBarDivide />

      <ToolBarCommonButton onClick={() => handleTools("blockquote")}>
        <FaQuoteRight />
      </ToolBarCommonButton>

      <ToolBarLinkArea ref={clickEl}>
        <ToolBarCommonButton onClick={() => handleTools("link")}>
          <FaLink />
        </ToolBarCommonButton>

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
      </ToolBarLinkArea>

      <ToolBarCommonButton onClick={() => handleTools("codeblock")}>
        <FaCode />
      </ToolBarCommonButton>

      <ToolBarImageLabel htmlFor="image">
        <FaImage />
      </ToolBarImageLabel>

      <ToolBarImageInput
        id="image"
        type="file"
        accept="image/png, image/jpeg, image/gif"
        ref={imageEl}
        onChange={(e) => handleChangeImage(e)}
      />
    </ToolBarWrapper>
  );
};

const ToolBarWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0.2rem 0;
`;

const ToolBarDivide = styled.span`
  height: auto;
  border: 1px solid ${({ theme }) => theme.color.bgColor5};
  margin: 0.5rem 0.5rem;
`;

const ToolBarImageInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const ToolBarLinkArea = styled.div`
  position: relative;
`;

const ToolBarButton = styled.button`
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

const ToolBarCommonButton = styled(ToolBarButton)`
  & > svg {
    color: ${({ theme }) => theme.color.ftColor4};
    font-size: 1.025rem;
  }
`;

const ToolBarButtonHeading = styled.div`
  display: flex;

  & > svg {
    color: ${({ theme }) => theme.color.ftColor4};
    font-size: 1.025rem;
  }
`;

const ToolBarButtonNumber = styled.p`
  font-weight: bold;
  color: ${({ theme }) => theme.color.ftColor4};
`;

const ToolBarImageLabel = styled.label`
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
