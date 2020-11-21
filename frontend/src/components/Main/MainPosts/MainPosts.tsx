import React from "react";
import PostType from "../../../util/types/Post";
import MainFixedPost from "./MainFixedPost";
import MainPostItem from "./MainPostItem";
import MainPostItemLoading from "./MainPostItemLoading";
import MainPostNotFound from "./MainPostNotFound";
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
          {loading ? (
            <div className="Main-Posts-Container-List">
              <MainPostItemLoading />
              <MainPostItemLoading />
              <MainPostItemLoading />
              <MainPostItemLoading />
              <MainPostItemLoading />
              <MainPostItemLoading />
              <MainPostItemLoading />
              <MainPostItemLoading />
              <MainPostItemLoading />
            </div>
          ) : (
            <>
              {fixedPost && <MainFixedPost fixedPost={fixedPost} />}
              <div className="Main-Posts-Container-List">
                {posts.map((post: PostType, idx: number) => (
                  <MainPostItem key={idx} post={post} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MainPosts;
