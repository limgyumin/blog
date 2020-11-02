import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import Main from "../../components/Main";
import PostStore from "../../stores/PostStore";

interface MainContainerProps {
  store?: StoreType;
}

interface StoreType {
  PostStore: PostStore;
}

const MainContainer = ({ store }: MainContainerProps) => {
  const { posts, handlePosts } = store!.PostStore;

  const [postCount, setPostCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const requestHandlePosts = async () => {
    setLoading(true);
    await handlePosts().then((response) => {
      setPostCount(response.data["post_count"]);
      setLoading(false);
    });
  };

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
