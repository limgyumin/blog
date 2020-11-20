import { observer } from "mobx-react";
import React, { useCallback, useEffect, useState } from "react";
import queryString from "query-string";

import Main from "../../components/Main";
import PostType from "../../util/types/Post";
import useStore from "../../util/lib/hooks/useStore";
import { PostFixedResponse, PostsResponse } from "../../util/types/Response";

interface MainContainerProps {}

interface PostParamsType {
  page: number;
  limit: number;
  category?: number;
}

const MainContainer = ({}: MainContainerProps) => {
  const { store } = useStore();
  const { fixedPost, posts, handleFixedPost, handlePosts } = store.PostStore;
  const { categories, handleCategories } = store.CategoryStore;

  const [postCount, setPostCount] = useState<number>(0);
  const [notFound, setNotFound] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const handleFixedPostCallback = useCallback(async () => {
    await handleFixedPost().then((res: PostFixedResponse) => {});
  }, []);

  const handlePostsCallback = useCallback(async () => {
    const query: PostParamsType = {
      page: page,
      limit: 18,
    };

    const { tab } = queryString.parse(location.search);

    const category = Number(tab);

    if (category) {
      query.category = category;
    } else {
      delete query.category;
    }

    await handlePosts(query).then((res: PostsResponse) => {
      setPostCount(res.data["post_count"]);
      if (res.data.posts.length > 0 || page > 1) {
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    });
  }, [page]);

  const requestPosts = async () => {
    setLoading(true);
    const requestPostsPromise: Promise<void>[] = [
      handleFixedPostCallback(),
      handlePostsCallback(),
    ];
    await Promise.all(requestPostsPromise);
    setLoading(false);
  };

  const handleCategoriesCallback = useCallback(() => {
    if (categories.length === 0) {
      handleCategories().catch(() => {
        console.log("오 ㅈㄴ 큰 문제가 있네요");
      });
    }
  }, []);

  useEffect(() => {
    handleCategoriesCallback();
  }, []);

  useEffect(() => {
    requestPosts();
  }, []);

  return (
    <>
      <Main
        fixedPost={fixedPost}
        posts={posts}
        notFound={notFound}
        loading={loading}
      />
    </>
  );
};

export default observer(MainContainer);
