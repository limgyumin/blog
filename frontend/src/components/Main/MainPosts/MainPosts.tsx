import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import React, { FC } from "react";
import IPost from "../../../types/post.type";
import MainPostItem from "./MainPostItem";

const styles = require("./MainPosts.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type MainPostsProps = {
  posts: IPost[];
  lastPostEl: (node?: Element | null | undefined) => void;
};

const MainPosts: FC<MainPostsProps> = ({ posts, lastPostEl }) => {
  return (
    <div className={cx("main-posts")}>
      <div className={cx("main-posts-list")}>
        {posts.map((post: IPost, idx: number) => (
          <React.Fragment key={idx}>
            {posts.length - 1 === idx ? (
              <MainPostItem post={post} lastPostEl={lastPostEl} />
            ) : (
              <MainPostItem post={post} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MainPosts;
