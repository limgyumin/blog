import useModal from "hooks/util/useModal";
import usePostIdx from "hooks/util/usePostIdx";
import isEmpty from "lib/isEmpty";
import removeLastBlank from "lib/removeLastBlank";
import { RootState } from "modules";
import { fetchCommentCountThunk } from "modules/comment";
import { deleteReplyThunk, updateReplyThunk } from "modules/reply";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import IReply from "types/reply.type";

export default function useReply(fetchRepliesHandler: () => Promise<void>, reply?: IReply) {
  const { login, profile } = useSelector((state: RootState) => state.users.data);

  const dispatch = useDispatch();

  const postIdx = usePostIdx();
  const { isMount, onMount } = useModal();

  const [replyIdx, setReplyIdx] = useState<number>(0);
  const [content, setContent] = useState<string>("");
  const [updateMode, setUpdateMode] = useState<boolean>(false);

  const onChangeContent = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = e.target;
      setContent(value);
    },
    [setContent]
  );

  const updateReplyHandler = useCallback(() => {
    if (!login) return;

    if (isEmpty(content)) {
      toast.warn("내용을 작성해주세요.");
      return;
    }

    const onUpdateReply = async () => {
      dispatch(fetchCommentCountThunk(postIdx));
      await fetchRepliesHandler();
      setContent("");
      setReplyIdx(0);
      setUpdateMode(false);
    };

    dispatch(updateReplyThunk(replyIdx, removeLastBlank(content), onUpdateReply));
  }, [
    login,
    content,
    postIdx,
    replyIdx,
    dispatch,
    setContent,
    setReplyIdx,
    setUpdateMode,
    fetchRepliesHandler,
  ]);

  const deleteReplyHandler = useCallback(() => {
    if (!login) return;

    const onDeleteReply = async () => {
      onMount();
      dispatch(fetchCommentCountThunk(postIdx));
      await fetchRepliesHandler();
      setReplyIdx(0);
    };

    dispatch(deleteReplyThunk(replyIdx, onDeleteReply));
  }, [login, postIdx, replyIdx, dispatch, onMount, setReplyIdx, fetchRepliesHandler]);

  const onUpdateHandler = useCallback(() => {
    const { idx, content } = reply;
    console.log(idx, content);

    setReplyIdx(idx);
    setContent(content);
    setUpdateMode(true);
  }, [reply, setReplyIdx, setContent, setUpdateMode]);

  const onCancelUpdateHandler = useCallback(() => {
    setUpdateMode(false);
    setContent("");
  }, [setUpdateMode, setContent]);

  const onDeleteHandler = useCallback(
    (idx: number) => {
      setReplyIdx(idx);
      onMount();
    },
    [setReplyIdx, onMount]
  );

  const onKeyDownContent = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const { key, shiftKey } = e;
      if ((key === "Enter" || key === "NumpadEnter") && !shiftKey) {
        e.preventDefault();
        if (reply && reply.idx) {
          updateReplyHandler();
        }
      }
    },
    [reply, updateReplyHandler]
  );

  return {
    login,
    profile,
    content,
    isMount,
    updateMode,
    onMount,
    onChangeContent,
    onKeyDownContent,
    onUpdateHandler,
    onCancelUpdateHandler,
    onDeleteHandler,
    updateReplyHandler,
    deleteReplyHandler,
  };
}
