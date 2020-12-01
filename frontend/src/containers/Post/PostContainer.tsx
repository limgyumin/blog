import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import Post from "../../components/Post";
import useStore from "../../util/lib/hooks/useStore";
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom";
import { PostResponse } from "../../util/types/Response";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PostContainerProps extends RouteComponentProps<MatchType> {}

interface MatchType {
  idx: string;
}

const PostContainer = ({ match }: PostContainerProps) => {
  const history = useHistory();
  const { store } = useStore();
  const { post, handlePost } = store.PostStore;
  const [loading, setLoading] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);

  const { idx } = match.params;

  const handlePostCallback = useCallback(async () => {
    setLoading(true);
    handlePost(Number(idx))
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

  useEffect(() => {
    handlePostCallback();
  }, [handlePostCallback]);

  return (
    <>
      <Post post={post} loading={loading} notFound={notFound} />
    </>
  );
};

export default observer(withRouter(PostContainer));
