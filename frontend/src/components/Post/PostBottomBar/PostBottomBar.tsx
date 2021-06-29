import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import Modal from "components/common/Modal";
import useBottomBar from "hooks/common/useBottomBar";
import useModal from "hooks/common/useModal";
import React, { FC } from "react";
import { BsArrowBarUp } from "react-icons/bs";
import { IoMdHeart, IoMdHeartEmpty, IoIosMore } from "react-icons/io";
import PostLikedUsers from "../PostLikedUsers";
import "./PostBottomBar.scss";

const styles = require("./PostBottomBar.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type PostBottomBarProps = {
  onClick: (behavior: ScrollBehavior) => void;
};

const PostBottomBar: FC<PostBottomBarProps> = ({ onClick }) => {
  const { liked, likeCount, handleClickCreateLike } = useBottomBar();
  const { isMount, handleModalMount } = useModal();

  return (
    <React.Fragment>
      <Modal isMount={isMount}>
        <PostLikedUsers onClose={handleModalMount} />
      </Modal>
      <div className={cx("post-bottombar")}>
        <button className={cx("post-bottombar-like")} onClick={handleClickCreateLike}>
          {liked ? <IoMdHeart /> : <IoMdHeartEmpty />}
          <p className={cx("post-bottombar-like-count")}>{likeCount}</p>
        </button>
        <button className={cx("post-bottombar-users")} onClick={handleModalMount}>
          <IoIosMore />
        </button>
        <button className={cx("post-bottombar-scroll")} onClick={() => onClick("smooth")}>
          <BsArrowBarUp />
        </button>
      </div>
    </React.Fragment>
  );
};

export default PostBottomBar;
