import React, { FC } from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { CgImage } from "react-icons/cg";
import usePostThumbnail from "hooks/post/usePostThumbnail";

const styles = require("./HandleThumbnail.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HandleThumbnailProps = {
  onChange: (name: string, value: any) => void;
};

const HandleThumbnail: FC<HandleThumbnailProps> = ({ onChange }) => {
  const { thumbnail, imageEl, handleChangeThumbnail, handleDeleteThumbnail } = usePostThumbnail(
    onChange
  );
  return (
    <div className={cx("handle-thumbnail")}>
      <div className={cx("handle-thumbnail-wrapper")}>
        {thumbnail ? (
          <div className={cx("handle-thumbnail-wrapper-preview")}>
            <img
              src={thumbnail}
              alt="thumbnail"
              className={cx("handle-thumbnail-wrapper-preview-image")}
            />
            <div className={cx("handle-thumbnail-wrapper-preview-buttons")}>
              <label
                htmlFor="thumbnail"
                className={cx("handle-thumbnail-wrapper-preview-buttons-change")}
              >
                재업로드
              </label>
              <button
                className={cx("handle-thumbnail-wrapper-preview-buttons-cancel")}
                onClick={handleDeleteThumbnail}
              >
                제거
              </button>
            </div>
          </div>
        ) : (
          <div className={cx("handle-thumbnail-wrapper-default")}>
            <CgImage className={cx("handle-thumbnail-wrapper-default-icon")} />
            <label htmlFor="thumbnail" className={cx("handle-thumbnail-wrapper-default-upload")}>
              썸네일 업로드
            </label>
          </div>
        )}
      </div>
      <input
        id="thumbnail"
        type="file"
        accept="image/png, image/jpeg, image/gif"
        ref={imageEl}
        onChange={(e) => handleChangeThumbnail(e)}
      />
    </div>
  );
};

export default HandleThumbnail;
