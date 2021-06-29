import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import React, { FC } from "react";

const styles = require("./HandleCreateContent.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HandleCreateContentProps = {
  contentEl: React.MutableRefObject<HTMLTextAreaElement>;
  content: string;
  onClick: () => void;
  onChange: (name: string, value: any) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
};

const HandleCreateContent: FC<HandleCreateContentProps> = ({
  contentEl,
  content,
  onClick,
  onChange,
  onKeyDown,
  onScroll,
}) => {
  return (
    <div className={cx("handle-create-content")} onClick={onClick} onScroll={(e) => onScroll(e)}>
      <textarea
        ref={contentEl}
        value={content}
        name="content"
        className={cx("handle-create-content-textarea")}
        placeholder="당신의 이야기를 들려주세요!"
        onChange={({ target: { name, value } }) => onChange(name, value)}
        onKeyDown={(e) => onKeyDown(e)}
      />
    </div>
  );
};

export default HandleCreateContent;
