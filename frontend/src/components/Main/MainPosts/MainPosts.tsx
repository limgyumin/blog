import React from "react";
import MainPostItem from "./MainPostItem";
import "./MainPosts.scss";

interface MainPostsProps {
  posts: PostType[];
  loading: boolean;
}

interface PostType {
  idx: number;
  title: string;
  description: string;
  thumbnail: string;
  fk_category_idx: number;
  created_at: Date;
  category_name: string;
  comment_count: number;
  like_count: number;
}

const MainPosts = ({ posts, loading }: MainPostsProps) => {
  return (
    <>
      <div className="Main-Posts">
        <div className="Main-Posts-Container">
          {posts.map((post: PostType, idx: number) => (
            <MainPostItem key={idx} post={post} />
          ))}
        </div>
        {loading && <h1>로딩중이야요.</h1>}
      </div>
    </>
  );
};

export default MainPosts;
