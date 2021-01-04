import React from "react";
import { BsArrowBarUp } from "react-icons/bs";
import { IoMdHeart, IoMdHeartEmpty, IoIosMore } from "react-icons/io";
import "./PostBottomBar.scss";

interface PostBottomBarProps {
  liked: boolean;
  likeCount: number;
  scrollToTopSmooth: () => void;
  handlePostLikeCallback: () => Promise<void>;
  showModalCallback: () => void;
}

const PostBottomBar = ({
  liked,
  likeCount,
  scrollToTopSmooth,
  handlePostLikeCallback,
  showModalCallback,
}: PostBottomBarProps) => {
  return (
    <>
      <div className="Post-BottomBar">
        <button
          className="Post-BottomBar-Like"
          onClick={() => handlePostLikeCallback()}
        >
          {liked ? <IoMdHeart /> : <IoMdHeartEmpty />}
          <p className="Post-BottomBar-Like-Count">{likeCount}</p>
        </button>
        <button
          className="Post-BottomBar-Users"
          onClick={() => showModalCallback()}
        >
          <IoIosMore />
        </button>
        <button
          className="Post-BottomBar-ScrollTop"
          onClick={() => scrollToTopSmooth()}
        >
          <BsArrowBarUp />
        </button>
      </div>
    </>
  );
};

export default PostBottomBar;
