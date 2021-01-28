import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import Temp from "../../components/Temp";
import useStore from "../../util/lib/hooks/useStore";
import { PostsResponse, ProfileResponse } from "../../util/types/Response";
import PostType from "../../util/types/Post";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Portal from "../../components/common/Portal";
import ModalContainer from "../Modal/ModalContainer";
import TempPostDeleteAlert from "../../components/Temp/TempPostDeleteAlert";
import { Helmet } from "react-helmet";
import ReactHelmet from "../../components/common/ReactHelmet";

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
  const { handleTempPosts, handleDeletePost } = store.PostStore;

  const [isShow, setIsShow] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [tempPosts, setTempPosts] = useState<PostType[]>([]);
  const [postIdx, setPostIdx] = useState<number>(0);

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

  const handleDeleteTempPostCallback = useCallback(async () => {
    if (admin && login) {
      await handleDeletePost(postIdx)
        .then((res: Response) => {
          handleTempPostsCallback();
        })
        .catch((err: Error) => {
          toast.error("악! 임시 글 삭제에 실패했어요.");
        });
    }
  }, [postIdx, handleTempPostsCallback]);

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

  const showModalCallback = useCallback(() => {
    if (isShow) {
      setTimeout(() => {
        setIsShow(!isShow);
      }, 500);
    } else {
      setIsShow(!isShow);
    }
    setIsOpen(!isOpen);
  }, [isShow, isOpen]);

  const deleteClickHandler = (idx: number) => {
    setPostIdx(idx);
    showModalCallback();
  };

  const deletePostHandler = useCallback(async () => {
    await handleDeleteTempPostCallback();
    showModalCallback();
  }, [handleDeleteTempPostCallback]);

  useEffect(() => {
    handleAdminCallback();
  }, [handleAdminCallback]);

  useEffect(() => {
    handleTempPostsCallback();
  }, [handleTempPostsCallback]);

  return (
    <>
      <ReactHelmet
        title="Temp | Untitled"
        description="개발자를 꿈꾸는 한 학생의 이야기"
      />
      <Portal elementId="modal-root">
        <ModalContainer isOpen={isOpen} isShow={isShow}>
          <TempPostDeleteAlert
            deletePostHandler={deletePostHandler}
            showModalCallback={showModalCallback}
          />
        </ModalContainer>
      </Portal>
      <Temp tempPosts={tempPosts} deleteClickHandler={deleteClickHandler} />
    </>
  );
};

export default observer(TempContainer);
