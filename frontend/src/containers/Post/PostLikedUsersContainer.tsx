import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import PostLikedUsers from "../../components/Post/PostLikedUsers";
import useStore from "../../util/lib/hooks/useStore";
import { LikedUsersResponse } from "../../util/types/Response";
import { toast } from "react-toastify";
import UserType from "../../util/types/User";

interface PostLikedUsersContainerProps {
  postIdx: number;
  showModalCallback: () => void;
}

const PostLikedUsersContainer = ({
  postIdx,
  showModalCallback,
}: PostLikedUsersContainerProps) => {
  const { store } = useStore();
  const { handleLikedUsers } = store.PostStore;

  const [likeCount, setLikeCount] = useState<number>(0);
  const [likedUsers, setLikedUsers] = useState<UserType[]>([]);

  const handleLikedUserCallback = useCallback(async () => {
    await handleLikedUsers(postIdx)
      .then((res: LikedUsersResponse) => {
        setLikedUsers(res.data["liked_users"]);
        setLikeCount(res.data["like_count"]);
      })
      .catch((err: Error) => {
        toast.error("으악! 유저 목록 조회에 실패했어요.");
      });
  }, [postIdx]);

  useEffect(() => {
    handleLikedUserCallback();
    return () => {
      setLikeCount(0);
      setLikedUsers([]);
    };
  }, [handleLikedUserCallback]);

  return (
    <>
      <PostLikedUsers
        likeCount={likeCount}
        likedUsers={likedUsers}
        showModalCallback={showModalCallback}
      />
    </>
  );
};

export default observer(PostLikedUsersContainer);
