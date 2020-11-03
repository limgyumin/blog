import { inject, observer } from "mobx-react";
import React, { useCallback, useEffect, useState } from "react";
import queryString from "query-string";

import Main from "../../components/Main";
import CategoryStore from "../../stores/CategoryStore";
import PostStore from "../../stores/PostStore";

interface MainContainerProps {
  store?: StoreType;
}

interface StoreType {
  PostStore: PostStore;
  CategoryStore: CategoryStore;
}

interface PostParamsType {
  page: number;
  limit: number;
  category?: number;
}

const MainContainer = ({ store }: MainContainerProps) => {
  const { posts, handlePosts } = store!.PostStore;
  const { categories, handleCategories } = store!.CategoryStore;

  const [postCount, setPostCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const requestHandlePosts = useCallback(async () => {
    setLoading(true);
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

    await handlePosts(query).then((res: any) => {
      setPostCount(res.data["post_count"]);
      setLoading(false);
    });
  }, [page]);

  const requestHandleCategories = useCallback(() => {
    if (categories.length === 0) {
      handleCategories().catch(() => {
        console.log("오 ㅈㄴ 큰 문제가 있네요");
      });
    }
  }, []);

  useEffect(() => {
    requestHandleCategories();
  }, []);

  useEffect(() => {
    console.log(categories);
  });

  useEffect(() => {
    requestHandlePosts();
  }, []);

  return (
    <>
      <Main posts={posts} loading={loading} />
    </>
  );
};

export default inject("store")(observer(MainContainer));
