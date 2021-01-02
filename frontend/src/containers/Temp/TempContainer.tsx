import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import Temp from "../../components/Temp";
import useStore from "../../util/lib/hooks/useStore";
import { PostsResponse } from "../../util/types/Response";
import PostType from "../../util/types/Post";
import { toast } from "react-toastify";

const TempContainer = ({}) => {
  const { store } = useStore();
  const { handleTempPosts } = store.PostStore;
  const [tempPosts, setTempPosts] = useState<PostType[]>([]);

  const handleTempPostsCallback = useCallback(async () => {
    await handleTempPosts()
      .then((res: PostsResponse) => {
        setTempPosts(res.data.posts);
      })
      .catch((err) => {
        toast.error("으악! 임시 글 목록 조회에 실패했어요.");
      });
  }, []);

  useEffect(() => {
    handleTempPostsCallback();
  }, [handleTempPostsCallback]);

  return (
    <>
      <Temp tempPosts={tempPosts} />
    </>
  );
};

export default observer(TempContainer);
