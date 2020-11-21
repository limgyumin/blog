import React from "react";
import PostType from "../../../util/types/Post";
import MainFixedPost from "./MainFixedPost";
import MainPostItem from "./MainPostItem";
import MainPostItemLoading from "./MainPostItemLoading";
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
          <div className="Main-Posts-Container-List">
            {loading ? (
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
            ) : (
              <>
                {fixedPost && <MainFixedPost fixedPost={fixedPost} />}
                {posts.map((post: PostType, idx: number) => (
                  <MainPostItem key={idx} post={post} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPosts;
