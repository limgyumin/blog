import usePostIdx from "hooks/util/usePostIdx";
import isEmpty from "lib/isEmpty";
import removeLastBlank from "lib/removeLastBlank";
import { RootState } from "modules";
import { fetchCommentCountThunk, fetchCommentsThunk } from "modules/comment";
import { createReplyThunk } from "modules/reply";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function useCreateReply(commentIdx: number) {
  const { login } = useSelector((state: RootState) => state.users.data);

  const dispatch = useDispatch();

  const postIdx = usePostIdx();

  const [content, setContent] = useState<string>("");

  const replyLastEl = useRef<HTMLDivElement>(null);

  const handleChangeContent = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setContent(value);
  }, []);

  const handleFetchComments = useCallback(() => {
    const onFetchComments = () => {
      const { current } = replyLastEl;
      if (current) {
        current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    };

    dispatch(fetchCommentsThunk(postIdx, onFetchComments));
  }, [postIdx, dispatch]);

  const handleCreateReply = useCallback(() => {
    if (!login) {
      toast.info("로그인 후 답글을 작성하실 수 있어요.");
      return;
    }

    if (isEmpty(content)) {
      toast.warn("내용을 작성해주세요.");
      return;
    }

    const onCreateReply = async () => {
      setContent("");
      dispatch(fetchCommentCountThunk(postIdx));
      handleFetchComments();
    };

    dispatch(createReplyThunk(commentIdx, removeLastBlank(content), onCreateReply));
  }, [login, content, postIdx, commentIdx, dispatch, handleFetchComments]);

  const handleKeyDownContent = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const { key, shiftKey } = e;
      if ((key === "Enter" || key === "NumpadEnter") && !shiftKey) {
        e.preventDefault();
        handleCreateReply();
      }
    },
    [handleCreateReply]
  );

  useEffect(() => {
    return () => setContent("");
  }, []);

  return {
    content,
    replyLastEl,
    handleCreateReply,
    handleChangeContent,
    handleKeyDownContent,
  };
}
