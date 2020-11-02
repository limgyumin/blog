import React from "react";
import "./Main.scss";
import MainPosts from "./MainPosts";

interface MainProps {
  posts: PostType[];
  loading: boolean;
}

interface PostType {
  idx: number;
  title: string;
  description: string;
  thumbnail: string;
  created_at: Date;
  comment_count: number;
  like_count: number;
}

const Main = ({ posts, loading }: MainProps) => {
  return (
    <>
      <MainPosts posts={posts} loading={loading} />
    </>
  );
};

export default Main;
