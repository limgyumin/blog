import React from "react";
import Footer from "../common/Footer";
import MainCategories from "./MainCategories";
import MainCategoryItem from "./MainCategories/MainCategoryItem";
import MainPosts from "./MainPosts";
import MainPostLoading from "./MainPosts/MainPostLoading";
import MainPostNotFound from "./MainPosts/MainPostNotFound";
import useFetchPosts from "hooks/post/useFetchPosts";
import useFetchCategories from "hooks/category/useFetchCategories";
import ReactHelmet from "components/common/ReactHelmet";
import { THUMBNAIL_URL } from "config/config.json";
import MainTimeMessage from "./MainTimeMessage";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./Main.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const Main = () => {
  const { posts, notFound, loading, lastPostEl } = useFetchPosts();
  const { categories, totalPostCount } = useFetchCategories();

  const totalView = {
    idx: 0,
    name: "All",
    post_count: totalPostCount,
  };

  return (
    <React.Fragment>
      <ReactHelmet
        title="Nonamed"
        description="개발자를 꿈꾸는 한 학생의 이야기"
        url="https://nonamed.blog"
        image={THUMBNAIL_URL}
      />
      <div className={cx("main")}>
        <div className={cx("main-wrap")}>
          <div className={cx("main-wrap-container")}>
            <div className={cx("main-wrap-container-categories")}>
              <MainCategoryItem category={totalView} />
              {categories.map((category, idx) => (
                <MainCategoryItem key={idx} category={category} />
              ))}
            </div>
            <MainTimeMessage />
            {notFound ? <MainPostNotFound /> : <MainPosts posts={posts} lastPostEl={lastPostEl} />}
            {loading && <MainPostLoading />}
          </div>
          <MainCategories categories={categories} totalView={totalView} />
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Main;
