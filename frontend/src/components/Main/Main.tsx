import React from "react";
import PostType from "../../util/types/Post";
import "./Main.scss";
import MainPosts from "./MainPosts";

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
        <div className="Main-Container">
          <MainPosts
            fixedPost={fixedPost}
            posts={posts}
            notFound={notFound}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default Main;
