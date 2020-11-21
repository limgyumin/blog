import React from "react";
import PostType from "../../util/types/Post";
import "./Main.scss";
import MainPosts from "./MainPosts";
import MainPostNotFound from "./MainPosts/MainPostNotFound";

interface MainProps {
  fixedPost: PostType;
  posts: PostType[];
  notFound: boolean;
  loading: boolean;
}

const Main = ({ fixedPost, posts, notFound, loading }: MainProps) => {
  return (
    <>
      <div className="Main">
        {notFound ? (
          <MainPostNotFound />
        ) : (
          <div className="Main-Container">
            <MainPosts fixedPost={fixedPost} posts={posts} loading={loading} />
          </div>
        )}
      </div>
    </>
  );
};

export default Main;
