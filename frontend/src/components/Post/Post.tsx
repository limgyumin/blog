import React from "react";
import MarkDownContainer from "../../containers/MarkDown/MarkDownContainer";
import PostCommentContainer from "../../containers/Post/PostCommentContainer";
import OtherPostsType from "../../util/types/OtherPosts";
import PostType from "../../util/types/Post";
import "./Post.scss";
import PostHeader from "./PostHeader";
import PostList from "./PostList";
import PostLoading from "./PostLoading";
import PostProfile from "./PostProfile";

interface PostProps {
  post: PostType;
  loading: boolean;
  notFound: boolean;
  likeCount: number;
  liked: boolean;
  handlePostLikeCallback: () => Promise<void>;
  postIdx: number;
  otherPosts: Partial<OtherPostsType>;
}

const Post = ({
  post,
  loading,
  notFound,
  likeCount,
  liked,
  handlePostLikeCallback,
  postIdx,
  otherPosts,
}: PostProps) => {
  return (
    <>
      <div className="Post">
        {notFound ? (
          <p>아무것도 없떵</p>
        ) : (
          <div className="Post-Container">
            {loading ? (
              <PostLoading />
            ) : (
              post.idx && (
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
                  {post.content && (
                    <MarkDownContainer className="Post-Content">
                      {post.content}
                    </MarkDownContainer>
                  )}
                  <PostProfile
                    avatar={post.user.avatar}
                    writer={post.user.name}
                    bio={post.user.bio}
                    id={post.user.id}
                  />
                  <PostList otherPosts={otherPosts} />
                  <PostCommentContainer postIdx={postIdx} />
                </>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Post;
