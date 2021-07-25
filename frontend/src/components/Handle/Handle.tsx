import React from "react";

import * as S from "./styles";

import HandleCreateContent from "./HandleCreateContent";
import HandlePreview from "./HandlePreview";
import HandleBottom from "./HandleBottom";
import HandleSubmitModal from "./HandleSubmitModal";

import ReactHelmet from "components/common/UI/ReactHelmet";
import ToolBar from "components/common/UI/ToolBar/ToolBar";

import useModal from "hooks/common/useModal";
import useHandlePost from "hooks/post/useHandlePost";
import usePostTextArea from "hooks/post/usePostTextArea";

import { THUMBNAIL_URL } from "config/config.json";

type Props = unknown;

const Handle: React.FC<Props> = () => {
  const {
    valid,
    request,
    handleCancelPost,
    handleSavePost,
    handleSubmitPost,
    handleChangeRequest,
  } = useHandlePost();
  const {
    passed,
    titleEl,
    contentEl,
    handleScrollContent,
    handleKeyDownContent,
    handleFocusContent,
  } = usePostTextArea(request, handleChangeRequest);
  const { isMount, handleModalMount } = useModal();

  const { title, content, description } = request;

  return (
    <>
      <ReactHelmet
        title="Handle | Nonamed"
        description="개발자를 꿈꾸는 한 학생의 이야기"
        image={THUMBNAIL_URL}
      />
      <HandleSubmitModal
        title={title}
        description={description}
        isMount={isMount}
        onCancel={handleModalMount}
        onSubmit={handleSubmitPost}
        onChange={handleChangeRequest}
      />
      <S.HandleWrapper>
        <S.HandleContent>
          <S.HandleWrite>
            <S.HandleWriteHeader $active={passed}>
              <S.HandleInputTitle
                ref={titleEl}
                value={title}
                name="title"
                placeholder="제목을 입력해주세요"
                onChange={({ target: { name, value } }) =>
                  handleChangeRequest(name, value)
                }
              />
              <S.HandleInputTitleBottomLine />
            </S.HandleWriteHeader>
            <S.HandleWriteToolBar $active={passed}>
              <ToolBar contentEl={contentEl} onChange={handleChangeRequest} />
            </S.HandleWriteToolBar>
            <HandleCreateContent
              content={content}
              contentEl={contentEl}
              onChange={handleChangeRequest}
              onScroll={handleScrollContent}
              onKeyDown={handleKeyDownContent}
              onClick={handleFocusContent}
            />
          </S.HandleWrite>
          <HandlePreview title={title} content={content} />
        </S.HandleContent>
        <HandleBottom
          valid={valid}
          onCancel={handleCancelPost}
          onSave={handleSavePost}
          onComplete={handleModalMount}
        />
      </S.HandleWrapper>
    </>
  );
};

export default Handle;
