import React from "react";
import { THUMBNAIL_URL } from "config/config.json";
import useHandlePost from "hooks/post/useHandlePost";
import ReactHelmet from "components/common/ReactHelmet";
import InputTitle from "./InputTitle";
import useModal from "hooks/common/useModal";
import ToolBar from "components/common/ToolBar";
import HandleCreateContent from "./HandleCreateContent";
import HandlePreview from "./HandlePreview";
import HandleBottom from "./HandleBottom";
import HandleSubmitModal from "./HandleSubmitModal";
import usePostTextArea from "hooks/post/usePostTextArea";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./Handle.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const Handle = () => {
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
    <React.Fragment>
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
      <div className={cx("handle")}>
        <div className={cx("handle-content")}>
          <div className={cx("handle-content-wrap")}>
            <div className={cx("handle-content-wrap-header", { "header-passed": passed })}>
              <InputTitle titleEl={titleEl} title={title} onChange={handleChangeRequest} />
            </div>
            <div className={cx("handle-content-wrap-toolbar", { "toolbar-passed": passed })}>
              <ToolBar contentEl={contentEl} onChange={handleChangeRequest} />
            </div>
            <HandleCreateContent
              content={content}
              contentEl={contentEl}
              onChange={handleChangeRequest}
              onScroll={handleScrollContent}
              onKeyDown={handleKeyDownContent}
              onClick={handleFocusContent}
            />
          </div>
          <HandlePreview title={title} content={content} />
        </div>
        <HandleBottom
          valid={valid}
          onCancel={handleCancelPost}
          onSave={handleSavePost}
          onComplete={handleModalMount}
        />
      </div>
    </React.Fragment>
  );
};

export default Handle;
