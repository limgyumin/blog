import useModal from "hooks/common/useModal";
import usePostIdx from "hooks/util/usePostIdx";
import isEmpty from "lib/isEmpty";
import removeLastBlank from "lib/removeLastBlank";
import { RootState } from "modules";
import { fetchCommentCountThunk, fetchCommentsThunk } from "modules/comment";
import { deleteReplyThunk, updateReplyThunk } from "modules/reply";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import IReply from "types/reply.type";

export default function useReply(reply?: IReply) {
  const { login, profile } = useSelector((state: RootState) => state.users.data);

  const dispatch = useDispatch();

  const postIdx = usePostIdx();
  const { isMount, handleModalMount } = useModal();

  const [replyIdx, setReplyIdx] = useState<number>(0);
  const [content, setContent] = useState<string>("");
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [showReplies, setShowReplies] = useState<boolean>(false);

  const handleChangeContent = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setContent(value);
  }, []);

  const handleUpdateReply = useCallback(() => {
    if (!login) return;

    if (isEmpty(content)) {
      toast.warn("내용을 작성해주세요.");
      return;
    }

    const onUpdateReply = async () => {
      dispatch(fetchCommentCountThunk(postIdx));
      dispatch(fetchCommentsThunk(postIdx));
      setContent("");
      setReplyIdx(0);
      setUpdateMode(false);
    };

    dispatch(updateReplyThunk(replyIdx, removeLastBlank(content), onUpdateReply));
  }, [login, content, postIdx, replyIdx, dispatch]);

  const handleDeleteReply = useCallback(() => {
    if (!login) return;

    const onDeleteReply = async () => {
      handleModalMount();
      dispatch(fetchCommentCountThunk(postIdx));
      dispatch(fetchCommentsThunk(postIdx));
      setReplyIdx(0);
    };

    dispatch(deleteReplyThunk(replyIdx, onDeleteReply));
  }, [login, postIdx, replyIdx, dispatch, handleModalMount]);

  const handleClickUpdateReply = useCallback(() => {
    const { idx, content } = reply;

    setReplyIdx(idx);
    setContent(content);
    setUpdateMode(true);
  }, [reply]);

  const handleCancelUpdateReply = useCallback(() => {
    setUpdateMode(false);
    setContent("");
  }, []);

  const handleClickDeleteReply = useCallback(
    (idx: number) => {
      setReplyIdx(idx);
      handleModalMount();
    },
    [handleModalMount]
  );

  const handleKeyDownContent = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const { key, shiftKey } = e;
      if ((key === "Enter" || key === "NumpadEnter") && !shiftKey) {
        e.preventDefault();
        if (reply && reply.idx) {
          handleUpdateReply();
        }
      }
    },
    [reply, handleUpdateReply]
  );

  const handleShowReplies = useCallback(() => {
    setShowReplies((showReplies) => !showReplies);
  }, []);

  useEffect(() => {
    return () => {
      setReplyIdx(0);
      setContent("");
      setUpdateMode(false);
      setShowReplies(false);
    };
  }, []);

  return {
    login,
    profile,
    content,
    isMount,
    showReplies,
    updateMode,
    handleModalMount,
    handleShowReplies,
    handleChangeContent,
    handleKeyDownContent,
    handleClickUpdateReply,
    handleCancelUpdateReply,
    handleClickDeleteReply,
    handleUpdateReply,
    handleDeleteReply,
  };
}
