import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import React, { FC } from "react";

const styles = require("./InputLink.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type InputLinkProps = {
  linkEl: React.MutableRefObject<HTMLDivElement>;
  linkInputEl: React.MutableRefObject<HTMLInputElement>;
  link: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const InputLink: FC<InputLinkProps> = ({
  linkEl,
  linkInputEl,
  link,
  onChange,
  onClick,
  onKeyDown,
}) => {
  return (
    <div className={cx("input-link")} ref={linkEl}>
      <h3 className={cx("input-link-title")}>링크 삽입하기</h3>
      <input
        value={link}
        ref={linkInputEl}
        type="text"
        placeholder="링크를 입력해주세요."
        className={cx("input-link-insert")}
        onChange={(e) => onChange(e)}
        onKeyDown={(e) => onKeyDown(e)}
      />
      <div className={cx("input-link-submit")}>
        <button className={cx("input-link-submit-button")} onClick={onClick}>
          완료
        </button>
      </div>
    </div>
  );
};

export default InputLink;
