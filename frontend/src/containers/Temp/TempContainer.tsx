import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import Temp from "../../components/Temp";
import useStore from "../../util/lib/hooks/useStore";
import { PostsResponse, ProfileResponse } from "../../util/types/Response";
import PostType from "../../util/types/Post";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import axios from "axios";

const TempContainer = ({}) => {
  const history = useHistory();
  const { store } = useStore();
  const {
    admin,
    login,
    handleLoginState,
    handleAdminState,
    handleMyProfile,
  } = store.UserStore;
  const { handleTempPosts } = store.PostStore;
  const [tempPosts, setTempPosts] = useState<PostType[]>([]);

  const handleTempPostsCallback = useCallback(async () => {
    if (admin && login) {
      await handleTempPosts()
        .then((res: PostsResponse) => {
          setTempPosts(res.data.posts);
        })
        .catch((err) => {
          toast.error("으악! 임시 글 목록 조회에 실패했어요.");
        });
    } else {
      history.push("/");
    }
  }, [admin, login]);

  const handleAdminCallback = useCallback(async () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      handleLoginState(true);
      axios.defaults.headers.common["access_token"] = token;

      await handleMyProfile()
        .then((res: ProfileResponse) => {
          if (res.data.user.is_admin) {
            handleAdminState(true);
          } else {
            history.push("/");
          }
        })
        .catch((err: Error) => {
          if (err.message.indexOf("410")) {
            localStorage.removeItem("access_token");
            handleLoginState(false);
            axios.defaults.headers.common["access_token"] = "";
          }
        });
    } else {
      handleLoginState(false);
      history.push("/");
    }
  }, []);

  useEffect(() => {
    handleAdminCallback();
  }, [handleAdminCallback]);

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
