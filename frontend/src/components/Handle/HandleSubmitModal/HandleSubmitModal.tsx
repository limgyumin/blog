import React, { FC } from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import HandleThumbnail from "./HandleThumbnail";
import HandleTitlePreview from "./HandleTitlePreview";
import HandleDescription from "./HandleDescription";
import DelayUnmount from "components/common/DelayUnmount";
import HandleCategory from "./HandleCategory";
import useTheme from "hooks/util/useTheme";

const styles = require("./HandleSubmitModal.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HandleSubmitModalProps = {
  title: string;
  description: string;
  isMount: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  onChange: (name: string, value: any) => void;
};

const HandleSubmitModal: FC<HandleSubmitModalProps> = ({
  title,
  description,
  isMount,
  onCancel,
  onSubmit,
  onChange,
}) => {
  const { isLight } = useTheme();

  return (
    <DelayUnmount delay={500} isMount={isMount}>
      <div className={cx("handle-submit-modal", { light: isLight, dark: !isLight })}>
        <div
          className={cx("handle-submit-modal-overlay", {
            appear: isMount,
            disappear: !isMount,
          })}
          onClick={onCancel}
        />
        <div
          className={cx("handle-submit-modal-box", {
            "rise-up": isMount,
            "rise-down": !isMount,
          })}
        >
          <div className={cx("handle-submit-modal-box-wrap")}>
            <div className={cx("handle-submit-modal-box-wrap-header")}>
              <h3 className={cx("handle-submit-modal-box-wrap-header-text")}>작성 완료하기</h3>
              <div className={cx("handle-submit-modal-box-wrap-header-line")} />
            </div>
            <div className={cx("handle-submit-modal-box-wrap-content")}>
              <div className={cx("handle-submit-modal-box-wrap-content-area")}>
                <div className={cx("handle-submit-modal-box-wrap-content-area-main")}>
                  <HandleTitlePreview title={title} />
                  <HandleCategory onChange={onChange} />
                  <HandleDescription description={description} onChange={onChange} />
                </div>
                <HandleThumbnail onChange={onChange} />
              </div>
            </div>
            <div className={cx("handle-submit-modal-box-wrap-bottom")}>
              <button
                className={cx("handle-submit-modal-box-wrap-bottom-cancel")}
                onClick={onCancel}
              >
                취소
              </button>
              <button
                className={cx("handle-submit-modal-box-wrap-bottom-submit")}
                onClick={onSubmit}
              >
                작성 완료
              </button>
            </div>
          </div>
        </div>
      </div>
    </DelayUnmount>
  );
};

export default HandleSubmitModal;
