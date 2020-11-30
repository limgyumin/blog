import { observer } from "mobx-react";
import React, { useCallback, useEffect, useState } from "react";
import Main from "../../components/Main";
import useStore from "../../util/lib/hooks/useStore";
import { PostsResponse } from "../../util/types/Response";
import useQuery from "../../util/lib/hooks/useQuery";
import { useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";

interface MainContainerProps {}

interface PostParamsType {
  page: number;
  limit: number;
  category?: number;
}

const MainContainer = ({}: MainContainerProps) => {
  const { search } = useLocation();
  const query = useQuery();

  const { store } = useStore();
  const {
    fixedPost,
    posts,
    handleFixedPost,
    handlePosts,
    initPosts,
    initFixedPost,
  } = store.PostStore;
  const { totalPostCount, categories, handleCategories } = store.CategoryStore;

  const [postCount, setPostCount] = useState<number>(0);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [fixedLoading, setFixedLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const [ref, inView] = useInView({ threshold: 0.5 });

  const handleFixedPostCallback = useCallback(async () => {
    if (search === "") {
      setFixedLoading(true);
      await handleFixedPost()
        .then(() => {
          setFixedLoading(false);
        })
        .catch((err: Error) => {
          console.log(err);
        });
    } else {
      initFixedPost();
    }
  }, [search]);

  const handlePostsCallback = useCallback(async () => {
    setLoading(true);

    const param: PostParamsType = {
      page: page,
      limit: 18,
    };

    const category: number = Number(query.get("tab"));

    if (category) {
      param.category = category;
    } else {
      delete param.category;
    }

    await handlePosts(param).then((res: PostsResponse) => {
      setLoading(false);
      setPostCount(res.data["post_count"]);
      if (res.data["posts"].length > 0 || page > 1) {
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    });
  }, [page, search]);

  const handleCategoriesCallback = useCallback(async () => {
    if (categories.length === 0) {
      await handleCategories().catch((err: Error) => {
        console.log(err);
      });
    }
  }, []);

  useEffect(() => {
    if (inView && !loading && posts.length < postCount) {
      setLoading(true);
      setPage((page) => page + 1);
    }
  }, [inView, postCount, page, loading]);

  const initPostsCallback = useCallback(() => {
    initPosts();
    setPage(1);
  }, [search]);

  useEffect(() => {
    initPostsCallback();
  }, [initPostsCallback]);

  useEffect(() => {
    handleCategoriesCallback();
  }, [handleCategoriesCallback]);

  useEffect(() => {
    handleFixedPostCallback();
  }, [handleFixedPostCallback]);

  useEffect(() => {
    handlePostsCallback();
  }, [handlePostsCallback]);

  return (
    <>
      <Main
        fixedPost={fixedPost}
        posts={posts}
        categories={categories}
        totalPostCount={totalPostCount}
        notFound={notFound}
        loading={loading}
        fixedLoading={fixedLoading}
        postRef={ref}
      />
    </>
  );
};

export default observer(MainContainer);
