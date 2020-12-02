import React from "react";
import MarkDownContainer from "../../containers/MarkDown/MarkDownContainer";
import PostType from "../../util/types/Post";
import "./Post.scss";
import PostHeader from "./PostHeader";
import PostLoading from "./PostLoading";
import PostProfile from "./PostProfile";

interface PostProps {
  post: PostType;
  loading: boolean;
  notFound: boolean;
  likeCount: number;
  liked: boolean;
  handlePostLikeCallback: () => Promise<void>;
}

const Post = ({
  post,
  loading,
  notFound,
  likeCount,
  liked,
  handlePostLikeCallback,
}: PostProps) => {
  console.log(post);

  return (
    <>
      {post.idx && (
        <div className="Post">
          {notFound ? (
            <p>아무것도 없떵</p>
          ) : (
            <div className="Post-Container">
              {loading ? (
                <PostLoading />
              ) : (
                <>
                  <PostHeader
                    title={post.title}
                    writer={post.user.name}
                    categoryName={post.category_name}
                    createdAt={post.created_at}
                    thumbnail={post.thumbnail}
                    handlePostLikeCallback={handlePostLikeCallback}
                    likeCount={likeCount}
                    liked={liked}
                  />
                  <MarkDownContainer className="Post-Content">
                    {post.content}
                  </MarkDownContainer>
                  <PostProfile
                    avatar={post.user.avatar}
                    writer={post.user.name}
                    bio={post.user.bio}
                    id={post.user.id}
                  />
                </>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Post;
