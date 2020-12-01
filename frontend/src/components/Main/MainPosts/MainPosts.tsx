import React from "react";
import PostType from "../../../util/types/Post";
import MainFixedPost from "./MainFixedPost";
import MainFixedPostLoading from "./MainFixedPostLoading";
import MainPostItem from "./MainPostItem";
import MainPostItemLoading from "./MainPostItemLoading";
import "./MainPosts.scss";

interface MainPostsProps {
  fixedPost: PostType;
  posts: PostType[];
  loading: boolean;
  fixedLoading: boolean;
  postRef: (node?: Element | null | undefined) => void;
}

const MainPosts = ({
  fixedPost,
  posts,
  loading,
  fixedLoading,
  postRef,
}: MainPostsProps) => {
  return (
    <>
      <div className="Main-Posts">
        <div className="Main-Posts-List">
          {fixedLoading ? (
            <MainFixedPostLoading />
          ) : (
            fixedPost.idx && <MainFixedPost fixedPost={fixedPost} />
          )}
          {posts.map((post: PostType, idx: number) => (
            <React.Fragment key={idx}>
              {posts.length - 1 === idx ? (
                <MainPostItem post={post} postRef={postRef} />
              ) : (
                <MainPostItem post={post} />
              )}
            </React.Fragment>
          ))}
          {loading && (
            <>
              <MainPostItemLoading />
              <MainPostItemLoading />
              <MainPostItemLoading />
              <MainPostItemLoading />
              <MainPostItemLoading />
              <MainPostItemLoading />
              <MainPostItemLoading />
              <MainPostItemLoading />
              <MainPostItemLoading />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MainPosts;
