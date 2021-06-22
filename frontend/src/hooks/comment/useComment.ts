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
import useModal from "hooks/util/useModal";
import IComment from "types/comment.type";

export default function useComment(comment?: IComment) {
  const { login, profile } = useSelector((state: RootState) => state.users.data);

  const dispatch = useDispatch();

  const { isMount, onMount } = useModal();
  const postIdx = usePostIdx();

  const [commentIdx, setCommentIdx] = useState<number>(0);
  const [content, setContent] = useState<string>("");
  const [updateMode, setUpdateMode] = useState<boolean>(false);

  const commentLastEl = useRef<HTMLDivElement>(null);
  const commentTextAreaEl = useRef<HTMLTextAreaElement>(null);

  const onChangeContent = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = e.target;
      setContent(value);
    },
    [setContent]
  );

  const fetchCommentsHandler = useCallback(() => {
    const onFetchComments = () => {
      const { current } = commentLastEl;
      if (current) {
        current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    };

    dispatch(fetchCommentsThunk(postIdx, onFetchComments));
  }, [commentLastEl, postIdx, dispatch]);

  const createCommentHandler = useCallback(() => {
    if (!login) {
      toast.info("로그인 후 댓글을 작성하실 수 있어요.");
      return;
    }

    if (isEmpty(content)) {
      toast.warn("내용을 작성해주세요.");
      return;
    }

    const onCreateComment = () => {
      fetchCommentsHandler();
      setContent("");
    };

    dispatch(createCommentThunk(postIdx, removeLastBlank(content), onCreateComment));
  }, [login, postIdx, content, dispatch, fetchCommentsHandler, setContent]);

  const updateCommentHandler = useCallback(() => {
    if (!login) return;

    if (isEmpty(content)) {
      toast.warn("내용을 작성해주세요.");
      return;
    }

    const onUpdateComment = () => {
      fetchCommentsHandler();
      setContent("");
      setCommentIdx(0);
      setUpdateMode(false);
    };

    dispatch(updateCommentThunk(commentIdx, removeLastBlank(content), onUpdateComment));
  }, [login, content, commentIdx, dispatch, fetchCommentsHandler, setContent, setCommentIdx]);

  const deleteCommentHandler = useCallback(() => {
    if (!login) return;

    const onDeleteComment = () => {
      onMount();
      setCommentIdx(0);
      fetchCommentsHandler();
    };

    dispatch(deleteCommentThunk(commentIdx, onDeleteComment));
  }, [login, commentIdx, dispatch, fetchCommentsHandler, setCommentIdx, onMount]);

  const onUpdateHandler = useCallback(() => {
    const { idx, content } = comment;

    setCommentIdx(idx);
    setContent(content);
    setUpdateMode(true);
  }, [comment, setCommentIdx, setContent, setUpdateMode]);

  const onCancelUpdateHandler = useCallback(() => {
    setContent("");
    setUpdateMode(false);
  }, [setContent, setUpdateMode]);

  const onDeleteHandler = useCallback(
    (idx: number) => {
      setCommentIdx(idx);
      onMount();
    },
    [setCommentIdx, onMount]
  );

  const onKeyDownContent = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const { key, shiftKey } = e;
      if ((key === "Enter" || key === "NumpadEnter") && !shiftKey) {
        e.preventDefault();
        if (comment && comment.idx) {
          updateCommentHandler();
        } else {
          createCommentHandler();
        }
      }
    },
    [comment, createCommentHandler, updateCommentHandler]
  );

  const increaseContentScrollHandler = useCallback(() => {
    const { current } = commentTextAreaEl;
    if (current) {
      current.style.height = "0px";
      const scrollHeight = current.scrollHeight;
      current.style.height = scrollHeight + "px";
    }
  }, [commentTextAreaEl]);

  useEffect(() => {
    increaseContentScrollHandler();
  }, [content, increaseContentScrollHandler]);

  return {
    login,
    profile,
    content,
    commentLastEl,
    commentTextAreaEl,
    isMount,
    updateMode,
    onMount,
    onChangeContent,
    onKeyDownContent,
    onUpdateHandler,
    onCancelUpdateHandler,
    onDeleteHandler,
    createCommentHandler,
    updateCommentHandler,
    deleteCommentHandler,
  };
}
