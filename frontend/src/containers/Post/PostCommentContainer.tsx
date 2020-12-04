import { observer } from "mobx-react";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PostComment from "../../components/Post/PostComment";
import PostCommentDelete from "../../components/Post/PostComment/PostCommentDelete";
import useStore from "../../util/lib/hooks/useStore";
import {
  CommentCountResponse,
  CommentsResponse,
} from "../../util/types/Response";
import ModalContainer from "../Modal/ModalContainer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validateContent from "../../util/lib/validateContent";
import removeLastBlank from "../../util/lib/removeLastBlank";

/**
 * postIdx가 필요 -> PostCommentContainer에서 처리
 * commentIdx가 필요 -> PostCommentItemContainer에서 처리
 * 단, Delete 함수는 모달 내에서 처리하므로 모달을 부르는
 * PostCommentContainer에서 로직을 처리한다.
 */

interface PostCommentContainerProps {
  postIdx: number;
}

const PostCommentContainer = ({ postIdx }: PostCommentContainerProps) => {
  const { store } = useStore();
  const history = useHistory();
  const { login } = store.UserStore;
  const {
    comments,
    isOpen,
    isShow,
    showModal,
    handleCommentCount,
    handleCreateComment,
    handleComments,
    handleDeleteComment,
  } = store.CommentStore;

  const [commentCount, setCommentCount] = useState<number>(0);

  // delete 모달 때문에 commentIdx를 직접 가져와야함 ㅠ .ㅠ
  const [commentIdx, setCommentIdx] = useState<number>(0);
  const [content, setContent] = useState<string>("");

  // 댓글 개수 조회
  const handleCommentCountCallback = useCallback(async () => {
    await handleCommentCount(postIdx)
      .then((res: CommentCountResponse) => {
        setCommentCount(res.data["total_count"]);
      })
      .catch((err: Error) => {
        history.push("/");
      });
  }, [postIdx, comments]);

  // 댓글 생성
  const handleCreateCommentCallback = useCallback(async () => {
    if (login) {
      if (!validateContent(content)) {
        toast.error("내용을 작성해주세요.");
        return;
      }
      await handleCreateComment(postIdx, removeLastBlank(content))
        .then((res: Response) => {
          setContent("");
          handleCommentsCallback();
        })
        .catch((err: Error) => {
          if (err.message.indexOf("401")) {
            toast.info("로그인 후 댓글을 작성하실 수 있어요.");
          } else {
            toast.error("이런! 댓글 작성에 실패했어요.");
            history.push("/");
          }
        });
    } else {
      toast.info("로그인 후 댓글을 작성하실 수 있어요.");
    }
  }, [postIdx, content, login]);

  // 모든 댓글 조회
  const handleCommentsCallback = useCallback(async () => {
    await handleComments(postIdx)
      .then((res: CommentsResponse) => {})
      .catch(() => {
        toast.error("이런! 댓글 조회에 실패했어요.");
        history.push("/");
      });
  }, [postIdx]);

  // 특정 댓글 삭제
  const handleDeleteCommentCallback = useCallback(async () => {
    await handleDeleteComment(commentIdx)
      .then((res: Response) => {
        handleCommentsCallback();
        showModal();
      })
      .catch((err: Error) => {
        toast.error("이런! 댓글 삭제에 실패했어요.");
        history.push("/");
      });
  }, [commentIdx]);

  // 댓글 생성 Enter키 처리 (Enter + Shift 줄바꿈)
  const keyDownListener = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      validateContent(content) &&
      (e.key === "Enter" || e.key === "NumpadEnter") &&
      !e.shiftKey
    ) {
      handleCreateCommentCallback();
    }
  };

  useEffect(() => {
    handleCommentCountCallback();
  }, [handleCommentCountCallback]);

  useEffect(() => {
    handleCommentsCallback();
  }, [handleCommentsCallback]);

  return (
    <>
      <ModalContainer isOpen={isOpen} isShow={isShow}>
        <PostCommentDelete
          handleDeleteCommentCallback={handleDeleteCommentCallback}
          showModal={showModal}
        />
      </ModalContainer>
      <PostComment
        comments={comments}
        commentCount={commentCount}
        content={content}
        setContent={setContent}
        setCommentIdx={setCommentIdx}
        showModal={showModal}
        handleCreateCommentCallback={handleCreateCommentCallback}
        handleCommentCountCallback={handleCommentCountCallback}
        handleCommentsCallback={handleCommentsCallback}
        keyDownListener={keyDownListener}
      />
    </>
  );
};

export default observer(PostCommentContainer);
