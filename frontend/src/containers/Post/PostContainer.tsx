import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import Post from "../../components/Post";
import useStore from "../../util/lib/hooks/useStore";
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom";
import { LikeInfoResponse, PostResponse } from "../../util/types/Response";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PostContainerProps extends RouteComponentProps<MatchType> {}

interface MatchType {
  idx: string;
}

const PostContainer = ({ match }: PostContainerProps) => {
  const history = useHistory();
  const { store } = useStore();
  const { post, handlePost, handlePostLike, handleLikeInfo } = store.PostStore;

  const [loading, setLoading] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);

  const { idx } = match.params;

  const handlePostCallback = useCallback(async () => {
    setLoading(true);
    await handlePost(Number(idx))
      .then((res: PostResponse) => {
        setLoading(false);
      })
      .catch((err: Error) => {
        if (err.message.indexOf("404")) {
          setNotFound(true);
        } else {
          toast.error("이런! 어딘가 문제가 있어요.");
          history.push("/");
        }
      });
  }, []);

  const handlePostLikeCallback = useCallback(async () => {
    await handlePostLike(Number(idx))
      .then((res: Response) => {
        handleGetLikeInfoCallback();
      })
      .catch((err: Error) => {
        toast.error("이런! 어딘가 문제가 있어요.");
        history.push("/");
      });
  }, []);

  const handleGetLikeInfoCallback = useCallback(async () => {
    await handleLikeInfo(Number(idx))
      .then((res: LikeInfoResponse) => {
        setLikeCount(res.data["like_count"]);
        setLiked(res.data["liked"]);
      })
      .catch((err: Error) => {
        toast.error("이런! 어딘가 문제가 있어요.");
        history.push("/");
      });
  }, []);

  useEffect(() => {
    handlePostCallback();
  }, [handlePostCallback]);

  useEffect(() => {
    handleGetLikeInfoCallback();
  }, [handleGetLikeInfoCallback]);

  return (
    <>
      <Post
        post={post}
        loading={loading}
        notFound={notFound}
        likeCount={likeCount}
        liked={liked}
        handlePostLikeCallback={handlePostLikeCallback}
      />
    </>
  );
};

export default observer(withRouter(PostContainer));
