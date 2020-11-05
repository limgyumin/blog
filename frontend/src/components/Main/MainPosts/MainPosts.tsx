import React from "react";
import PostType from "../../../util/types/PostType";
import MainFixedPost from "./MainFixedPost";
import MainPostItem from "./MainPostItem";
import "./MainPosts.scss";

interface MainPostsProps {
  fixedPost: PostType;
  posts: PostType[];
  loading: boolean;
}

const MainPosts = ({ fixedPost, posts, loading }: MainPostsProps) => {
  return (
    <>
      <div className="Main-Posts">
        <div className="Main-Posts-Container">
          {fixedPost && <MainFixedPost fixedPost={fixedPost} />}
          <div className="Main-Posts-Container-List">
            {posts.map((post: PostType, idx: number) => (
              <MainPostItem key={idx} post={post} />
            ))}
          </div>
        </div>
        {loading && <h1>로딩중이야요.</h1>}
      </div>
    </>
  );
};

export default MainPosts;
