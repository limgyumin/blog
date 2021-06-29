import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import React, { FC } from "react";

const styles = require("./InputLink.scss");
const cx: ClassNamesFn = classNames.bind(styles);

export type InputLinkProps = {
  linkEl: React.MutableRefObject<HTMLDivElement>;
  linkInputEl: React.MutableRefObject<HTMLInputElement>;
  link: string;
  changeLinkHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitLinkHandler: () => void;
  linkKeyDownHandler: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const InputLink: FC<InputLinkProps> = ({
  linkEl,
  linkInputEl,
  link,
  changeLinkHandler,
  submitLinkHandler,
  linkKeyDownHandler,
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
        onChange={(e) => changeLinkHandler(e)}
        onKeyDown={(e) => linkKeyDownHandler(e)}
      />
      <div className={cx("input-link-submit")}>
        <button className={cx("input-link-submit-button")} onClick={() => submitLinkHandler()}>
          완료
        </button>
      </div>
    </div>
  );
};

export default InputLink;
