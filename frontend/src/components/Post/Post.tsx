import React from "react";
import PostType from "../../util/types/Post";
import "./Post.scss";
import PostComponent from "./PostComponent";

interface PostProps {
  post?: PostType;
  loading: boolean;
  notFound: boolean;
}

const Post = ({ post, loading, notFound }: PostProps) => {
  return (
    <>
      <div className="Post">
        {notFound ? (
          <p>아무것도 없떵</p>
        ) : (
          <div className="Post-Container">
            {loading ? <p>로딩중이양</p> : <PostComponent post={post} />}
          </div>
        )}
      </div>
    </>
  );
};

export default Post;
