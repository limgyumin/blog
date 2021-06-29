import React from "react";
import Modal from "components/common/Modal";
import TempPostDelete from "./TempPostDelete";
import TempPostItem from "./TempPostItem";
import { THUMBNAIL_URL } from "../../config/config.json";
import ReactHelmet from "components/common/ReactHelmet";
import useFetchTempPosts from "hooks/temp/useFetchTempPosts";
import useTempPost from "hooks/temp/useTempPost";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./Temp.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const Temp = () => {
  const { posts } = useFetchTempPosts();
  const {
    isMount,
    handleModalMount,
    handleClickDeleteTempPost,
    handleDeleteTempPost,
  } = useTempPost();

  return (
    <React.Fragment>
      <ReactHelmet
        title="Temp | Nonamed"
        description="개발자를 꿈꾸는 한 학생의 이야기"
        image={THUMBNAIL_URL}
      />
      <Modal isMount={isMount}>
        <TempPostDelete onDelete={handleDeleteTempPost} onCancel={handleModalMount} />
      </Modal>
      <div className={cx("temp")}>
        <div className={cx("temp-wrap")}>
          <h1 className={cx("temp-wrap-title")}>Saved Posts</h1>
          <h4 className={cx("temp-wrap-subtitle")}>임시 저장된 글 목록이 표시됩니다.</h4>
          <div className={cx("temp-wrap-list")}>
            {posts.map((post) => (
              <TempPostItem key={post.idx} post={post} onClick={handleClickDeleteTempPost} />
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Temp;
