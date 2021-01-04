import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import useStore from "../../util/lib/hooks/useStore";
import PostCommentItem from "../../components/Post/PostComment/PostCommentItem";
import CommentType from "../../util/types/Comment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import isEmpty from "../../util/lib/isEmpty";
import removeLastBlank from "../../util/lib/removeLastBlank";
import { useHistory } from "react-router-dom";

interface PostCommentItemContainerProps {
  comment: CommentType;
  showModalCallback: () => void;
  setCommentIdx: React.Dispatch<React.SetStateAction<number>>;
  handleCommentCountCallback: () => Promise<void>;
  handleCommentsCallback: () => Promise<void>;
}

const PostCommentItemContainer = ({
  comment,
  showModalCallback,
  setCommentIdx,
  handleCommentCountCallback,
  handleCommentsCallback,
}: PostCommentItemContainerProps) => {
  const history = useHistory();
  const { store } = useStore();
  const { user, login } = store.UserStore;
  const { handleModifyComment } = store.CommentStore;

  const [content, setContent] = useState<string>("");
  const [enable, setEnable] = useState<boolean>(false);

  // 댓글 수정
  // Modify 함수 실행 전 수정한 내용 검증
  const handleModifyCommentCallback = useCallback(async () => {
    if (login) {
      if (isEmpty(content)) {
        toast.error("내용을 작성해주세요.");
        return;
      }
      setEnable(false);
      await handleModifyComment(comment.idx, removeLastBlank(content))
        .then((res: Response) => {
          handleCommentsCallback();
        })
        .catch((err: Error) => {
          toast.error("이런! 댓글 수정에 실패했어요.");
          history.push("/");
        });
    } else {
      toast.info("로그인 후 댓글을 수정하실 수 있습니다.");
    }
  }, [comment, content]);

  // Modify 취소 시 수정한 내용 초기화
  const handleModifyCancelCallback = useCallback(() => {
    setEnable(false);
    setContent(comment.content);
  }, [comment]);

  // 댓글 수정 Enter키 처리 (Enter + Shift 줄바꿈)
  const keyDownListener = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      !isEmpty(content) &&
      (e.key === "Enter" || e.key === "NumpadEnter") &&
      !e.shiftKey
    ) {
      handleModifyCommentCallback();
    }
  };

  // 삭제 버튼 클릭 시 모달 생성 및 선택한 Comment의 Idx를 저장
  const deleteClickListener = (idx: number) => {
    setCommentIdx(idx);
    showModalCallback();
  };

  // 새 Comment가 생성 될 시 생성된 Comment의 Content를 저장
  useEffect(() => {
    setContent(comment.content);
  }, [comment]);

  return (
    <>
      <PostCommentItem
        user={user}
        login={login}
        comment={comment}
        enable={enable}
        setEnable={setEnable}
        content={content}
        setContent={setContent}
        handleCommentCountCallback={handleCommentCountCallback}
        handleModifyCommentCallback={handleModifyCommentCallback}
        handleModifyCancelCallback={handleModifyCancelCallback}
        keyDownListener={keyDownListener}
        deleteClickListener={deleteClickListener}
      />
    </>
  );
};

export default observer(PostCommentItemContainer);
