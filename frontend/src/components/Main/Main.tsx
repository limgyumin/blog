import React from "react";
import { CategoryType } from "../../util/types/Category";
import PostType from "../../util/types/Post";
import Footer from "../common/Footer";
import "./Main.scss";
import MainCategories from "./MainCategories";
import MainCategoryItem from "./MainCategories/MainCategoryItem";
import MainPosts from "./MainPosts";
import MainPostLoading from "./MainPosts/MainPostLoading";
import MainPostNotFound from "./MainPosts/MainPostNotFound";
import timeMessage from "../../util/lib/timeMessage";

interface MainProps {
  posts: PostType[];
  categories: CategoryType[];
  totalPostCount: number;
  notFound: boolean;
  loading: boolean;
  postRef: (node?: Element | null | undefined) => void;
  modify: boolean;
  setModify: React.Dispatch<React.SetStateAction<boolean>>;
}

const Main = ({
  posts,
  categories,
  totalPostCount,
  notFound,
  loading,
  postRef,
}: MainProps) => {
  const totalView = {
    idx: 0,
    name: "All",
    post_count: totalPostCount,
  };
  return (
    <>
      <div className="Main">
        <div className="Main-Wrapper">
          <div className="Main-Wrapper-Container">
            <div className="Main-Wrapper-Container-List">
              <MainCategoryItem category={totalView} />
              {categories.map((category, idx) => (
                <MainCategoryItem key={idx} category={category} />
              ))}
            </div>
            <div className="Main-Wrapper-Container-Message">
              <p className="Main-Wrapper-Container-Message-Content">
                {timeMessage()}
              </p>
            </div>
            {notFound ? (
              <MainPostNotFound />
            ) : (
              <MainPosts posts={posts} loading={loading} postRef={postRef} />
            )}
            {loading && <MainPostLoading />}
          </div>
          <MainCategories categories={categories} totalView={totalView} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Main;
