import React from "react";
import styled from "styled-components";

import { CgImage } from "react-icons/cg";

import LabelButton from "components/common/UI/Buttons/LabelButton/LabelButton";
import Button from "components/common/UI/Buttons/Button/Button";

import usePostThumbnail from "hooks/post/usePostThumbnail";

type Props = {
  onChange: (name: string, value: any) => void;
};

const HandleThumbnail: React.FC<Props> = ({ onChange }) => {
  const {
    thumbnail,
    imageEl,
    handleChangeThumbnail,
    handleDeleteThumbnail,
  } = usePostThumbnail(onChange);

  return (
    <Container>
      <Wrapper>
        {thumbnail ? (
          <Thumbnail>
            <Image src={thumbnail} alt="thumbnail" />
            <Buttons>
              <LabelButton size="sm" color="gray" htmlFor="thumbnail">
                재업로드
              </LabelButton>
              <Button
                size="sm"
                color="lightGray"
                style={{ marginLeft: "0.4rem" }}
                onClick={handleDeleteThumbnail}
              >
                제거
              </Button>
            </Buttons>
          </Thumbnail>
        ) : (
          <DefaultThumbnail>
            <CgImage />
            <ButtonWrapper>
              <LabelButton size="sm" color="gray" htmlFor="thumbnail">
                썸네일 업로드
              </LabelButton>
            </ButtonWrapper>
          </DefaultThumbnail>
        )}
      </Wrapper>
      <ImageInput
        id="thumbnail"
        type="file"
        accept="image/png, image/jpeg, image/gif"
        ref={imageEl}
        onChange={(e) => handleChangeThumbnail(e)}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 32rem;
  padding-left: 1.5rem;
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

const Wrapper = styled.div`
  width: 100%;
  padding-top: 56%;
  position: relative;
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0.6rem;
  right: 0.6rem;
`;

const DefaultThumbnail = styled(Thumbnail)`
  background-color: ${({ theme }) => theme.color.bgColor5};
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    font-size: 2.8rem;
    color: ${({ theme }) => theme.color.ftColor4};
  }
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0.6rem;
  right: 0.6rem;
`;

export default HandleThumbnail;
