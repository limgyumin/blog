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
  scrollToTop: (behavior: ScrollBehavior) => void;
};

const PostBottomBar: FC<PostBottomBarProps> = ({ scrollToTop }) => {
  const { liked, likeCount, onCreateHandler } = useBottomBar();
  const { isMount, onMount } = useModal();

  return (
    <React.Fragment>
      <Modal isMount={isMount}>
        <PostLikedUsers onClose={onMount} />
      </Modal>
      <div className={cx("post-bottombar")}>
        <button className={cx("post-bottombar-like")} onClick={onCreateHandler}>
          {liked ? <IoMdHeart /> : <IoMdHeartEmpty />}
          <p className={cx("post-bottombar-like-count")}>{likeCount}</p>
        </button>
        <button className={cx("post-bottombar-users")} onClick={onMount}>
          <IoIosMore />
        </button>
        <button className={cx("post-bottombar-scroll")} onClick={() => scrollToTop("smooth")}>
          <BsArrowBarUp />
        </button>
      </div>
    </React.Fragment>
  );
};

export default PostBottomBar;
