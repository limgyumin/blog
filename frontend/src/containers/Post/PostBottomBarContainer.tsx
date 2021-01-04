import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import useStore from "../../util/lib/hooks/useStore";
import { toast } from "react-toastify";
import { LikeInfoResponse } from "../../util/types/Response";
import PostBottomBar from "../../components/Post/PostBottomBar";
import ModalContainer from "../Modal/ModalContainer";
import Portal from "../../components/common/Portal";
import PostLikedUsersContainer from "./PostLikedUsersContainer";

interface PostBottomBarContainerProps {
  postIdx: number;
  scrollToTopSmooth: () => void;
}

const PostBottomBarContainer = ({
  postIdx,
  scrollToTopSmooth,
}: PostBottomBarContainerProps) => {
  const history = useHistory();
  const { store } = useStore();
  const { handlePostLike, handleLikeInfo } = store.PostStore;
  const { login } = store.UserStore;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);

  // 글 좋아요 및 좋아요 취소
  const handlePostLikeCallback = useCallback(async () => {
    if (login) {
      await handlePostLike(postIdx)
        .then((res: Response) => {
          handleLikeInfoCallback();
        })
        .catch((err: Error) => {
          if (err.message.indexOf("401")) {
            toast.info("로그인 후 좋아요를 누르실 수 있어요.");
          } else {
            toast.error("이런! 어딘가 문제가 있어요.");
            history.push("/");
          }
        });
    } else {
      toast.info("로그인 후 좋아요를 누르실 수 있어요.");
    }
  }, [login]);

  // 글 좋아요 여부 조회
  const handleLikeInfoCallback = useCallback(async () => {
    await handleLikeInfo(postIdx)
      .then((res: LikeInfoResponse) => {
        setLikeCount(res.data["like_count"]);
        setLiked(res.data["liked"]);
      })
      .catch((err: Error) => {
        toast.error("이런! 좋아요 정보 조회에 실패했어요.");
        history.push("/");
      });
  }, [postIdx]);

  const showModalCallback = useCallback(() => {
    if (isShow) {
      setTimeout(() => {
        setIsShow(!isShow);
      }, 500);
    } else {
      setIsShow(!isShow);
    }
    setIsOpen(!isOpen);
  }, [isShow]);

  useEffect(() => {
    handleLikeInfoCallback();
    return () => {
      setLikeCount(0);
      setLiked(false);
    };
  }, [handleLikeInfoCallback]);

  return (
    <>
      <Portal elementId="modal-root">
        <ModalContainer isOpen={isOpen} isShow={isShow}>
          <PostLikedUsersContainer
            postIdx={postIdx}
            showModalCallback={showModalCallback}
          />
        </ModalContainer>
      </Portal>
      <PostBottomBar
        liked={liked}
        likeCount={likeCount}
        scrollToTopSmooth={scrollToTopSmooth}
        handlePostLikeCallback={handlePostLikeCallback}
        showModalCallback={showModalCallback}
      />
    </>
  );
};

export default observer(PostBottomBarContainer);
