import React, { useCallback, useEffect, useState } from "react";
import PostReplyItem from "../../components/Post/PostComment/PostReply/PostReplyItem";
import useStore from "../../util/lib/hooks/useStore";
import isEmpty from "../../util/lib/isEmpty";
import ReplyType from "../../util/types/Reply";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { observer } from "mobx-react";
import removeLastBlank from "../../util/lib/removeLastBlank";
import { useHistory } from "react-router-dom";

interface PostReplyItemContainerProps {
  reply: ReplyType;
  setReplyIdx: React.Dispatch<React.SetStateAction<number>>;
  showModalCallback: () => void;
  handleRepliesCallback: () => Promise<void>;
}

const PostReplyItemContainer = ({
  reply,
  setReplyIdx,
  showModalCallback,
  handleRepliesCallback,
}: PostReplyItemContainerProps) => {
  const history = useHistory();
  const { store } = useStore();
  const { user, login } = store.UserStore;
  const { handleModifyReply } = store.ReplyStore;

  const [content, setContent] = useState<string>("");
  const [enable, setEnable] = useState<boolean>(false);

  // 답글 수정
  const handleModifyReplyCallback = useCallback(async () => {
    if (isEmpty(content)) {
      toast.error("내용을 작성해주세요.");
      return;
    }
    await handleModifyReply(reply.idx, removeLastBlank(content))
      .then((res: Response) => {
        handleRepliesCallback();
        setEnable(false);
      })
      .catch((err: Error) => {
        toast.error("이런! 댓글 수정에 실패했어요.");
        history.push("/");
      });
  }, [reply, content, handleRepliesCallback]);

  // 답글 수정 취소 시 수정한 내용 초기화
  const handleModifyCancelCallback = useCallback(() => {
    setEnable(false);
    setContent(reply.content);
  }, [reply]);

  const deleteClickListener = (idx: number) => {
    setReplyIdx(idx);
    showModalCallback();
  };

  // 답글 수정 Enter키 처리 (Enter + Shift 줄바꿈)
  const keyDownListener = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      !isEmpty(content) &&
      (e.key === "Enter" || e.key === "NumpadEnter") &&
      !e.shiftKey
    ) {
      e.preventDefault();
      handleModifyReplyCallback();
    }
  };

  useEffect(() => {
    setContent(reply.content);
  }, [reply]);

  return (
    <>
      <PostReplyItem
        reply={reply}
        user={user}
        login={login}
        enable={enable}
        setEnable={setEnable}
        content={content}
        setContent={setContent}
        deleteClickListener={deleteClickListener}
        handleModifyReplyCallback={handleModifyReplyCallback}
        handleModifyCancelCallback={handleModifyCancelCallback}
        keyDownListener={keyDownListener}
      />
    </>
  );
};

export default observer(PostReplyItemContainer);
