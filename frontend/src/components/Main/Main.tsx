import React from "react";
import { CategoryType } from "../../util/types/Category";
import PostType from "../../util/types/Post";
import "./Main.scss";
import MainCategories from "./MainCategories";
import MainPosts from "./MainPosts";
import MainPostNotFound from "./MainPosts/MainPostNotFound";

interface MainProps {
  posts: PostType[];
  categories: CategoryType[];
  totalPostCount: number;
  notFound: boolean;
  loading: boolean;
  postRef: (node?: Element | null | undefined) => void;
  admin: boolean;
  modify: boolean;
  setModify: React.Dispatch<React.SetStateAction<boolean>>;
  scrollToTop: () => void;
  mainRef: React.RefObject<HTMLDivElement>;
}

const Main = ({
  posts,
  categories,
  totalPostCount,
  notFound,
  loading,
  postRef,
  admin,
  scrollToTop,
  mainRef,
}: MainProps) => {
  return (
    <>
      <div className="Main">
        <div className="Main-Wrapper" ref={mainRef}>
          <div className="Main-Wrapper-Container">
            <MainCategories
              categories={categories}
              totalPostCount={totalPostCount}
              admin={admin}
            />
            {notFound ? (
              <MainPostNotFound />
            ) : (
              <MainPosts posts={posts} loading={loading} postRef={postRef} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
