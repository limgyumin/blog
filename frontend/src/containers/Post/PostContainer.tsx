import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import Post from "../../components/Post";
import useStore from "../../util/lib/hooks/useStore";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { PostResponse } from "../../util/types/Response";

interface PostContainerProps extends RouteComponentProps<MatchType> {}

interface MatchType {
  idx: string;
}

const PostContainer = ({ match }: PostContainerProps) => {
  const { store } = useStore();
  const { post, handlePost } = store.PostStore;
  const [loading, setLoading] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);

  const handlePostCallback = useCallback(async () => {
    setLoading(true);
    const { idx } = match.params;
    handlePost(Number(idx))
      .then((res: PostResponse) => {
        setLoading(false);
      })
      .catch((err: Error) => {
        if (err.message.indexOf("404")) {
          setNotFound(true);
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
