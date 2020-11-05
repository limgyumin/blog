import React from "react";
import PostType from "../../util/types/PostType";
import "./Main.scss";
import MainPosts from "./MainPosts";

interface MainProps {
  fixedPost: PostType;
  posts: PostType[];
  loading: boolean;
}

const Main = ({ fixedPost, posts, loading }: MainProps) => {
  return (
    <>
      <MainPosts fixedPost={fixedPost} posts={posts} loading={loading} />
    </>
  );
};

export default Main;
