import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./PostList.scss";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { IOtherPosts } from "types/post.type";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./PostList.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type PostListProps = {
  otherPosts: Partial<IOtherPosts>;
};

const PostList: FC<PostListProps> = ({ otherPosts }) => {
  return (
    <div className={cx("post-list")}>
      {otherPosts.previous && (
        <div className={cx("post-list-previous")}>
          <Link to={`/post/${otherPosts.previous?.idx}`} className={cx("post-list-previous-wrap")}>
            <IoMdArrowBack />
            <div className={cx("post-list-previous-wrap-content")}>
              <h3 className={cx("post-list-previous-wrap-content-name")}>Previous Post</h3>
              <p className={cx("post-list-previous-wrap-content-title")}>
                {otherPosts.previous?.title}
              </p>
            </div>
          </Link>
        </div>
      )}
      {otherPosts.next && (
        <div className={cx("post-list-next")}>
          <Link to={`/post/${otherPosts.next?.idx}`} className={cx("post-list-next-wrap")}>
            <div className={cx("post-list-next-wrap-content")}>
              <h3 className={cx("post-list-next-wrap-content-name")}>Next Post</h3>
              <p className={cx("post-list-next-wrap-content-title")}>{otherPosts.next?.title}</p>
            </div>
            <IoMdArrowForward />
          </Link>
        </div>
      )}
    </div>
  );
};

export default PostList;
