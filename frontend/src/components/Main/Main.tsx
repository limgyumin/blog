import React from "react";
import { CategoryType } from "../../util/types/Category";
import PostType from "../../util/types/Post";
import Footer from "../common/Footer";
import "./Main.scss";
import MainCategories from "./MainCategories";
import MainPosts from "./MainPosts";
import MainPostNotFound from "./MainPosts/MainPostNotFound";
import { BsChevronDoubleDown } from "react-icons/bs";

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
  modify,
  setModify,
  scrollToTop,
  mainRef,
}: MainProps) => {
  return (
    <>
      <div className="Main">
        <div className="Main-Banner">
          <div className="Main-Banner-Content">
            <h1>Write the Code, Clean the World.</h1>
            <p>코딩이 취미인 한 학생의 이야기.</p>
            <BsChevronDoubleDown onClick={() => scrollToTop()} />
          </div>
        </div>
        <div className="Main-Wrapper" ref={mainRef}>
          <div className="Main-Wrapper-Container">
            <div className="Main-Wrapper-Container-Title">
              <h1>Create, Refactor, and Done.</h1>
              <p>항상 좋은 코드로 시작해 좋은 코드로 완성하기 위해.</p>
            </div>
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
