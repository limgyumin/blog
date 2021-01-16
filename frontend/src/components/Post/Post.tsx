import React from "react";
import MarkDownContainer from "../../containers/MarkDown/MarkDownContainer";
import PostBottomBarContainer from "../../containers/Post/PostBottomBarContainer";
import PostCommentContainer from "../../containers/Post/PostCommentContainer";
import OtherPostsType from "../../util/types/OtherPosts";
import PostType from "../../util/types/Post";
import "./Post.scss";
import PostHeader from "./PostHeader";
import PostList from "./PostList";
import PostLoading from "./PostLoading";
import PostNotFound from "./PostNotFound";
import PostProfile from "./PostProfile";

interface PostProps {
  postIdx: number;
  post: Partial<PostType>;
  loading: boolean;
  notFound: boolean;
  showModalCallback: () => void;
  otherPosts: Partial<OtherPostsType>;
  postTopRef: React.RefObject<HTMLDivElement>;
  scrollToTopSmooth: () => void;
  admin: boolean;
  modifyClickHandler: () => void;
}

const Post = ({
  postIdx,
  post,
  loading,
  notFound,
  showModalCallback,
  otherPosts,
  postTopRef,
  scrollToTopSmooth,
  admin,
  modifyClickHandler,
}: PostProps) => {
  return (
    <>
      <div className="Post" ref={postTopRef}>
        {post.idx && (
          <PostBottomBarContainer
            postIdx={postIdx}
            scrollToTopSmooth={scrollToTopSmooth}
          />
        )}
        {notFound ? (
          <PostNotFound />
        ) : (
          <>
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
                      showModalCallback={showModalCallback}
                      modifyClickHandler={modifyClickHandler}
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
                    {!post.is_temp && (
                      <PostCommentContainer postIdx={post.idx} />
                    )}
                  </>
                )
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Post;
