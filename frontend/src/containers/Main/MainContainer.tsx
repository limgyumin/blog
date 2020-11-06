import { inject, observer } from "mobx-react";
import React, { useCallback, useEffect, useState } from "react";
import queryString from "query-string";

import Main from "../../components/Main";
import CategoryStore from "../../stores/Category";
import PostStore from "../../stores/Post";
import PostType from "../../util/types/PostType";

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

interface PostsResponseType {
  status: number;
  message: string;
  data: {
    post_count: number;
    posts: PostType[];
  };
}

interface PostFixedResponseType {
  status: number;
  message: string;
  data: {
    post: PostType;
  };
}

const MainContainer = ({ store }: MainContainerProps) => {
  const { fixedPost, posts, handleFixedPost, handlePosts } = store!.PostStore;
  const { categories, handleCategories } = store!.CategoryStore;

  const [postCount, setPostCount] = useState<number>(0);
  const [notFound, setNotFound] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const handleFixedPostCallback = useCallback(async () => {
    await handleFixedPost().then((res: PostFixedResponseType) => {});
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

    await handlePosts(query).then((res: PostsResponseType) => {
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
      <Main fixedPost={fixedPost} posts={posts} loading={loading} />
    </>
  );
};

export default inject("store")(observer(MainContainer));
