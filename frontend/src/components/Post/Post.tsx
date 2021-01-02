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
  post: Partial<PostType>;
  loading: boolean;
  notFound: boolean;
  likeCount: number;
  liked: boolean;
  handlePostLikeCallback: () => Promise<void>;
  showModalCallback: () => void;
  modifyClickHandler: () => void;
  otherPosts: Partial<OtherPostsType>;
  postTopRef: React.RefObject<HTMLDivElement>;
  admin: boolean;
}

const Post = ({
  post,
  loading,
  notFound,
  likeCount,
  liked,
  handlePostLikeCallback,
  showModalCallback,
  modifyClickHandler,
  otherPosts,
  postTopRef,
  admin,
}: PostProps) => {
  return (
    <>
      <div className="Post" ref={postTopRef}>
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
                    title={post.title!}
                    writer={post.user!.name}
                    categoryName={post.category_name!}
                    createdAt={post.created_at!}
                    thumbnail={post.thumbnail!}
                    handlePostLikeCallback={handlePostLikeCallback}
                    showModalCallback={showModalCallback}
                    modifyClickHandler={modifyClickHandler}
                    likeCount={likeCount}
                    liked={liked}
                    admin={admin}
                  />
                  {post.content && (
                    <MarkDownContainer className="Post-Content">
                      {post.content}
                    </MarkDownContainer>
                  )}
                  <PostProfile
                    avatar={post.user!.avatar}
                    writer={post.user!.name}
                    bio={post.user!.bio}
                    id={post.user!.id}
                  />
                  <PostList otherPosts={otherPosts} />
                  {!post.is_temp && <PostCommentContainer postIdx={post.idx} />}
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
