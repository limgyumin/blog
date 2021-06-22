import usePostIdx from "hooks/util/usePostIdx";
import isEmpty from "lib/isEmpty";
import removeLastBlank from "lib/removeLastBlank";
import { RootState } from "modules";
import { fetchCommentCountThunk } from "modules/comment";
import { createReplyThunk } from "modules/reply";
import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function useCreateReply(
  fetchRepliesHandler: () => Promise<void>,
  commentIdx: number
) {
  const { login } = useSelector((state: RootState) => state.users.data);

  const dispatch = useDispatch();

  const postIdx = usePostIdx();

  const [content, setContent] = useState<string>("");

  const replyLastEl = useRef<HTMLDivElement>(null);

  const onChangeContent = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = e.target;
      setContent(value);
    },
    [setContent]
  );

  const createReplyHandler = useCallback(() => {
    if (!login) {
      toast.info("로그인 후 답글을 작성하실 수 있어요.");
      return;
    }

    if (isEmpty(content)) {
      toast.warn("내용을 작성해주세요.");
      return;
    }

    const onCreateReply = async () => {
      const { current } = replyLastEl;

      dispatch(fetchCommentCountThunk(postIdx));
      await fetchRepliesHandler();
      setContent("");

      if (current) {
        current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    };

    dispatch(createReplyThunk(commentIdx, removeLastBlank(content), onCreateReply));
  }, [login, content, postIdx, commentIdx, dispatch, setContent, fetchRepliesHandler]);

  const onKeyDownContent = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const { key, shiftKey } = e;
      if ((key === "Enter" || key === "NumpadEnter") && !shiftKey) {
        e.preventDefault();
        createReplyHandler();
      }
    },
    [createReplyHandler]
  );

  return {
    content,
    replyLastEl,
    createReplyHandler,
    onChangeContent,
    onKeyDownContent,
  };
}
