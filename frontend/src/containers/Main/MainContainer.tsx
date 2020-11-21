import { observer } from "mobx-react";
import React, { useCallback, useEffect, useState } from "react";
import Main from "../../components/Main";
import useStore from "../../util/lib/hooks/useStore";
import { CategoriesResponse, PostsResponse } from "../../util/types/Response";
import useQuery from "../../util/lib/hooks/useQuery";
import { useLocation } from "react-router-dom";

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
  const { fixedPost, posts, handleFixedPost, handlePosts } = store.PostStore;
  const { totalPostCount, categories, handleCategories } = store.CategoryStore;

  const [postCount, setPostCount] = useState<number>(0);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const handleFixedPostCallback = useCallback(async () => {
    await handleFixedPost().catch((err: Error) => {
      console.log(err);
    });
  }, [search]);

  const handlePostsCallback = useCallback(async () => {
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
      setPostCount(res.data["post_count"]);
      if (res.data["posts"].length > 0 || page > 1) {
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    });
  }, [page, search]);

  const requestPosts = async () => {
    setLoading(true);
    const requestPostsPromise: Promise<void>[] = [
      handleFixedPostCallback(),
      handlePostsCallback(),
    ];
    await Promise.all(requestPostsPromise);
    setLoading(false);
  };

  const handleCategoriesCallback = useCallback(async () => {
    await handleCategories()
      .then((res: CategoriesResponse) => {})
      .catch((err: Error) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    handleCategoriesCallback();
  }, [handleCategoriesCallback]);

  useEffect(() => {
    requestPosts();
  }, [handleFixedPostCallback, handlePostsCallback]);

  return (
    <>
      <Main
        fixedPost={fixedPost}
        posts={posts}
        categories={categories}
        totalPostCount={totalPostCount}
        notFound={notFound}
        loading={loading}
      />
    </>
  );
};

export default observer(MainContainer);
