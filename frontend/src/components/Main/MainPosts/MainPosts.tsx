import React from "react";
import useQuery from "../../../util/lib/hooks/useQuery";
import PostType from "../../../util/types/Post";
import MainFixedPost from "./MainFixedPost";
import MainPostItem from "./MainPostItem";
import MainPostItemLoading from "./MainPostItemLoading";
import "./MainPosts.scss";

interface MainPostsProps {
  fixedPost: PostType;
  posts: PostType[];
  loading: boolean;
  postCount: number;
  postRef: (node?: Element | null | undefined) => void;
}

const MainPosts = ({
  fixedPost,
  posts,
  loading,
  postCount,
  postRef,
}: MainPostsProps) => {
  const query = useQuery();
  return (
    <>
      <div className="Main-Posts">
        <div className="Main-Posts-List">
          <>
            {fixedPost && query.get("tab") === null && (
              <MainFixedPost fixedPost={fixedPost} />
            )}
            {posts.map((post: PostType, idx: number) => (
              <React.Fragment key={idx}>
                {posts.length - 1 === idx && postCount - 1 !== idx ? (
                  <MainPostItem post={post} postRef={postRef} />
                ) : (
                  <MainPostItem post={post} />
                )}
              </React.Fragment>
            ))}
          </>
          {loading && (
            <>
              <MainPostItemLoading />
              <MainPostItemLoading />
              <MainPostItemLoading />
              <MainPostItemLoading />
              <MainPostItemLoading />
              <MainPostItemLoading />
              <MainPostItemLoading />
              <MainPostItemLoading />
              <MainPostItemLoading />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MainPosts;
