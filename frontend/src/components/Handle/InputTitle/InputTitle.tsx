import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import React, { FC } from "react";

const styles = require("./InputTitle.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type InputTitleProps = {
  titleEl: React.MutableRefObject<HTMLTextAreaElement>;
  title: string;
  onChangeRequest: (name: string, value: any) => void;
};

const InputTitle: FC<InputTitleProps> = ({ titleEl, title, onChangeRequest }) => {
  return (
    <React.Fragment>
      <textarea
        ref={titleEl}
        value={title}
        name="title"
        placeholder="제목을 입력해주세요"
        className={cx("input-title")}
        onChange={({ target: { name, value } }) => onChangeRequest(name, value)}
      />
      <div className={cx("input-line")} />
    </React.Fragment>
  );
};

export default InputTitle;
