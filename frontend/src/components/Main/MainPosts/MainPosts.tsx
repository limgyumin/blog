import React from "react";
import PostType from "../../../util/types/Post";
import MainPostItem from "./MainPostItem";
import "./MainPosts.scss";

interface MainPostsProps {
  posts: PostType[];
  loading: boolean;
  postRef: (node?: Element | null | undefined) => void;
}

const MainPosts = ({ posts, loading, postRef }: MainPostsProps) => {
  return (
    <>
      <div className="Main-Posts">
        <div className="Main-Posts-List">
          {posts.map((post: PostType, idx: number) => (
            <React.Fragment key={idx}>
              {posts.length - 1 === idx ? (
                <MainPostItem post={post} postRef={postRef} />
              ) : (
                <MainPostItem post={post} />
              )}
            </React.Fragment>
          ))}
          {loading && <></>}
        </div>
      </div>
    </>
  );
};

export default MainPosts;
