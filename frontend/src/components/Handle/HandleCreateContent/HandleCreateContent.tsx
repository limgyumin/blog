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
  onScrollTextArea: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
};

const HandleCreateContent: FC<HandleCreateContentProps> = ({
  contentEl,
  content,
  contentFocusHandler,
  onChangeRequest,
  onKeyDownContent,
  onScrollTextArea,
}) => {
  return (
    <div
      className={cx("handle-create-content")}
      onClick={contentFocusHandler}
      onScroll={(e) => onScrollTextArea(e)}
    >
      <textarea
        ref={contentEl}
        value={content}
        name="content"
        className={cx("handle-create-content-textarea")}
        placeholder="당신의 이야기를 들려주세요!"
        onChange={({ target: { name, value } }) => onChangeRequest(name, value)}
        onKeyDown={(e) => onKeyDownContent(e)}
      />
    </div>
  );
};

export default HandleCreateContent;
