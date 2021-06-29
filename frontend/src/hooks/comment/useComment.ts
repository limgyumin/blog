import { useCallback, useEffect, useRef, useState } from "react";
import { RootState } from "modules";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommentThunk,
  deleteCommentThunk,
  fetchCommentsThunk,
  updateCommentThunk,
} from "modules/comment";
import usePostIdx from "hooks/util/usePostIdx";
import { toast } from "react-toastify";
import isEmpty from "lib/isEmpty";
import removeLastBlank from "lib/removeLastBlank";
import useModal from "hooks/common/useModal";
import IComment from "types/comment.type";

export default function useComment(comment?: IComment) {
  const { login, profile } = useSelector((state: RootState) => state.users.data);

  const dispatch = useDispatch();

  const { isMount, handleModalMount } = useModal();
  const postIdx = usePostIdx();

  const [commentIdx, setCommentIdx] = useState<number>(0);
  const [content, setContent] = useState<string>("");
  const [updateMode, setUpdateMode] = useState<boolean>(false);

  const commentLastEl = useRef<HTMLDivElement>(null);
  const commentTextAreaEl = useRef<HTMLTextAreaElement>(null);

  const handleChangeContent = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setContent(value);
  }, []);

  const handleFetchComments = useCallback(() => {
    const onFetchComments = () => {
      const { current } = commentLastEl;
      if (current) {
        current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    };

    dispatch(fetchCommentsThunk(postIdx, onFetchComments));
  }, [commentLastEl, postIdx, dispatch]);

  const handleCreateComment = useCallback(() => {
    if (!login) {
      toast.info("로그인 후 댓글을 작성하실 수 있어요.");
      return;
    }

    if (isEmpty(content)) {
      toast.warn("내용을 작성해주세요.");
      return;
    }

    const onCreateComment = () => {
      handleFetchComments();
      setContent("");
    };

    dispatch(createCommentThunk(postIdx, removeLastBlank(content), onCreateComment));
  }, [login, postIdx, content, dispatch, handleFetchComments]);

  const handleUpdateComment = useCallback(() => {
    if (!login) return;

    if (isEmpty(content)) {
      toast.warn("내용을 작성해주세요.");
      return;
    }

    const onUpdateComment = () => {
      handleFetchComments();
      setContent("");
      setCommentIdx(0);
      setUpdateMode(false);
    };

    dispatch(updateCommentThunk(commentIdx, removeLastBlank(content), onUpdateComment));
  }, [login, content, commentIdx, dispatch, handleFetchComments]);

  const handleDeleteComment = useCallback(() => {
    if (!login) return;

    const onDeleteComment = () => {
      handleModalMount();
      setCommentIdx(0);
      handleFetchComments();
    };

    dispatch(deleteCommentThunk(commentIdx, onDeleteComment));
  }, [login, commentIdx, dispatch, handleFetchComments, handleModalMount]);

  const handleClickUpdateComment = useCallback(() => {
    const { idx, content } = comment;

    setCommentIdx(idx);
    setContent(content);
    setUpdateMode(true);
  }, [comment]);

  const handleCancelUpdateComment = useCallback(() => {
    setContent("");
    setUpdateMode(false);
  }, []);

  const handleClickDeleteComment = useCallback(
    (idx: number) => {
      setCommentIdx(idx);
      handleModalMount();
    },
    [handleModalMount]
  );

  const handleKeyDownContent = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const { key, shiftKey } = e;
      if ((key === "Enter" || key === "NumpadEnter") && !shiftKey) {
        e.preventDefault();
        if (comment && comment.idx) {
          handleUpdateComment();
        } else {
          handleCreateComment();
        }
      }
    },
    [comment, handleCreateComment, handleUpdateComment]
  );

  const handleResizeContentScroll = useCallback(() => {
    const { current } = commentTextAreaEl;
    if (current) {
      current.style.height = "0px";
      const scrollHeight = current.scrollHeight;
      current.style.height = scrollHeight + "px";
    }
  }, [commentTextAreaEl]);

  useEffect(() => {
    handleResizeContentScroll();
  }, [content, handleResizeContentScroll]);

  useEffect(() => {
    return () => {
      setCommentIdx(0);
      setContent("");
      setUpdateMode(false);
    };
  }, []);

  return {
    login,
    profile,
    content,
    commentLastEl,
    commentTextAreaEl,
    isMount,
    updateMode,
    handleModalMount,
    handleChangeContent,
    handleKeyDownContent,
    handleClickUpdateComment,
    handleCancelUpdateComment,
    handleClickDeleteComment,
    handleCreateComment,
    handleUpdateComment,
    handleDeleteComment,
  };
}
