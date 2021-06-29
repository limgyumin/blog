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
    onCancelPost,
    onSavePost,
    onSubmitPost,
    onChangeRequest,
  } = useHandlePost();
  const {
    passed,
    titleEl,
    contentEl,
    onScrollTextArea,
    onKeyDownContent,
    contentFocusHandler,
  } = usePostTextArea(request, onChangeRequest);
  const { isMount, onMount } = useModal();

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
        onCancel={onMount}
        onSubmit={onSubmitPost}
        onChangeRequest={onChangeRequest}
      />
      <div className={cx("handle")}>
        <div className={cx("handle-content")}>
          <div className={cx("handle-content-wrap")}>
            <div className={cx("handle-content-wrap-header", { "header-passed": passed })}>
              <InputTitle titleEl={titleEl} title={title} onChangeRequest={onChangeRequest} />
            </div>
            <div className={cx("handle-content-wrap-toolbar", { "toolbar-passed": passed })}>
              <ToolBar contentEl={contentEl} onChangeRequest={onChangeRequest} />
            </div>
            <HandleCreateContent
              content={content}
              contentEl={contentEl}
              onChangeRequest={onChangeRequest}
              onScrollTextArea={onScrollTextArea}
              onKeyDownContent={onKeyDownContent}
              contentFocusHandler={contentFocusHandler}
            />
          </div>
          <HandlePreview title={title} content={content} />
        </div>
        <HandleBottom
          valid={valid}
          onCancel={onCancelPost}
          onSave={onSavePost}
          onComplete={onMount}
        />
      </div>
    </React.Fragment>
  );
};

export default Handle;
