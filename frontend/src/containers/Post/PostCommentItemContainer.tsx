import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import useStore from "../../util/lib/hooks/useStore";
import "react-toastify/dist/ReactToastify.css";
import PostCommentItem from "../../components/Post/PostComment/PostCommentItem";
import CommentType from "../../util/types/Comment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validateContent from "../../util/lib/validateContent";

interface PostCommentItemContainerProps {
  comment: CommentType;
  handleModifyCommentCallback: (
    commentIdx: number,
    content: string
  ) => Promise<void>;
}

const PostCommentItemContainer = ({
  comment,
  handleModifyCommentCallback,
}: PostCommentItemContainerProps) => {
  const { store } = useStore();
  const { user, login } = store.UserStore;

  const [edit, setEdit] = useState<string>("");
  const [enable, setEnable] = useState<boolean>(false);

  const modifyTryCallback = useCallback(() => {
    if (!validateContent(edit)) {
      toast.error("내용을 작성해주세요.");
      return;
    }
    setEnable(false);
    handleModifyCommentCallback(comment.idx, edit);
  }, [comment, edit]);

  const modifyCancelCallback = useCallback(() => {
    setEnable(false);
    setEdit(comment.content);
  }, [comment, enable]);

  const keyDownListener = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      validateContent(edit) &&
      (e.key === "Enter" || e.key === "NumpadEnter") &&
      !e.shiftKey
    ) {
      modifyTryCallback();
    }
  };

  useEffect(() => {
    setEdit(comment.content);
  }, [comment]);

  return (
    <>
      <PostCommentItem
        user={user}
        login={login}
        comment={comment}
        enable={enable}
        setEnable={setEnable}
        edit={edit}
        setEdit={setEdit}
        modifyTryCallback={modifyTryCallback}
        modifyCancelCallback={modifyCancelCallback}
        keyDownListener={keyDownListener}
      />
    </>
  );
};

export default observer(PostCommentItemContainer);
