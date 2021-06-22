import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import React, { FC } from "react";

const styles = require("./HandleCreateContent.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HandleCreateContentProps = {
  contentEl: React.MutableRefObject<HTMLTextAreaElement>;
  content: string;
  contentFocusHandler: () => void;
  onChangeRequest: (name: string, value: any) => void;
  onKeyDownContent: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onScrollToolBar: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
};

const HandleCreateContent: FC<HandleCreateContentProps> = ({
  contentEl,
  content,
  contentFocusHandler,
  onChangeRequest,
  onKeyDownContent,
  onScrollToolBar,
}) => {
  return (
    <div
      className={cx("handle-create-content")}
      onClick={contentFocusHandler}
      onScroll={(e) => onScrollToolBar(e)}
    >
      <textarea
        ref={contentEl}
        value={content}
        name="content"
        className={cx("handle-create-content-textarea")}
        placeholder="무엇이 궁금하신가요? 어떤 것이든 좋아요!"
        onChange={({ target: { name, value } }) => onChangeRequest(name, value)}
        onKeyDown={(e) => onKeyDownContent(e)}
      />
    </div>
  );
};

export default HandleCreateContent;
