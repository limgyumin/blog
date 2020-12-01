import React from "react";
import MarkDownContainer from "../../containers/MarkDown/MarkDownContainer";
import PostType from "../../util/types/Post";
import "./Post.scss";
import PostHeader from "./PostHeader";

interface PostProps {
  post: PostType;
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
            <>
              {loading ? (
                <p>로딩중이양</p>
              ) : (
                <>
                  <PostHeader
                    title={post.title}
                    categoryName={post.category_name}
                    createdAt={post.created_at}
                    thumbnail={post.thumbnail}
                  />
                  <MarkDownContainer className="Post-Content">
                    {post.content}
                  </MarkDownContainer>
                </>
              )}
            </>
          </div>
        )}
      </div>
    </>
  );
};

export default Post;
