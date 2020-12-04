import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useStore from "../../util/lib/hooks/useStore";
import PostReply from "../../components/Post/PostComment/PostReply";
import validateContent from "../../util/lib/validateContent";
import { RepliesResponse, ReplyCountResponse } from "../../util/types/Response";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import removeLastBlank from "../../util/lib/removeLastBlank";
import { observer } from "mobx-react";
import ReplyType from "../../util/types/Reply";
import ModalContainer from "../Modal/ModalContainer";
import PostReplyDelete from "../../components/Post/PostComment/PostReply/PostReplyDelete";

/**
 * commentIdx가 필요 -> PostReplyContainer에서 처리
 * replyIdx가 필요 -> PostReplyItemContainer에서 처리
 */

interface PostReplyContainerProps {
  commentIdx: number;
  handleCommentCountCallback: () => Promise<void>;
}

const PostReplyContainer = ({
  commentIdx,
  handleCommentCountCallback,
}: PostReplyContainerProps) => {
  const { store } = useStore();
  const {
    isShow,
    isOpen,
    showModal,
    handleReplyCount,
    handleCreateReply,
    handleReplies,
    handleDeleteReply,
  } = store.ReplyStore;
  const { comments } = store.CommentStore;

  const history = useHistory();
  const [replyCount, setReplyCount] = useState<number>(0);
  const [replyIdx, setReplyIdx] = useState<number>(0);
  const [replies, setReplies] = useState<Array<ReplyType>>([]);
  const [enable, setEnable] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");

  // 답글 생성
  const handleCreateReplyCallback = useCallback(async () => {
    if (!validateContent(content)) {
      toast.error("내용을 작성해주세요.");
      return;
    }
    await handleCreateReply(commentIdx, removeLastBlank(content))
      .then((res: Response) => {
        setContent("");
        handleCommentCountCallback();
        handleReplyCountCallback();
        handleRepliesCallback();
        setEnable(true);
      })
      .catch((err: Error) => {
        toast.error("이런! 답글 작성에 실패했어요.");
        history.push("/");
      });
  }, [commentIdx, content]);

  // 전체 답글 조회
  const handleRepliesCallback = useCallback(async () => {
    await handleReplies(commentIdx)
      .then((res: RepliesResponse) => {
        setReplies(res.data.replies);
      })
      .catch((err: Error) => {
        toast.error("이런! 답글 조회에 실패했어요.");
        history.push("/");
      });
  }, [commentIdx]);

  // 답글 개수 조회
  const handleReplyCountCallback = useCallback(async () => {
    await handleReplyCount(commentIdx)
      .then((res: ReplyCountResponse) => {
        setReplyCount(res.data["reply_count"]);
        if (res.data.reply_count > 0) {
          handleRepliesCallback();
        } else {
          setReplies([]);
        }
      })
      .catch((err: Error) => {
        history.push("/");
      });
  }, [commentIdx, handleRepliesCallback, comments]);

  const handleDeleteReplyCallback = useCallback(async () => {
    await handleDeleteReply(replyIdx)
      .then((res: Response) => {
        handleCommentCountCallback();
        handleReplyCountCallback();
        handleRepliesCallback();
        showModal();
      })
      .catch((err: Error) => {
        toast.error("이런! 답글 삭제에 실패했어요.");
        history.push("/");
      });
  }, [replyIdx]);

  // 답글 생성 취소시 작성 내용 초기화
  const handleCreateCancelCallback = useCallback(() => {
    if (replyCount) {
      setEnable(false);
    } else {
      setShow(false);
    }
    setContent("");
  }, [replyCount]);

  // 답글 작성 Enter키 처리 (Enter + Shift 줄바꿈)
  const keyDownListener = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      validateContent(content) &&
      (e.key === "Enter" || e.key === "NumpadEnter") &&
      !e.shiftKey
    ) {
      handleCreateReplyCallback();
    }
  };

  useEffect(() => {
    handleReplyCountCallback();
  }, [handleReplyCountCallback]);

  // show 상태가 아니라는건 숨기기를 클릭했다는 뜻.
  // 따라서 답글 작성 폼도 숨겨져야해요.
  useEffect(() => {
    if (!show) {
      setEnable(false);
    }
  }, [show]);

  return (
    <>
      <ModalContainer isOpen={isOpen} isShow={isShow}>
        <PostReplyDelete
          showModal={showModal}
          handleDeleteReplyCallback={handleDeleteReplyCallback}
        />
      </ModalContainer>
      <PostReply
        show={show}
        setShow={setShow}
        replies={replies}
        enable={enable}
        setEnable={setEnable}
        replyCount={replyCount}
        content={content}
        setContent={setContent}
        setReplyIdx={setReplyIdx}
        showModal={showModal}
        handleCreateReplyCallback={handleCreateReplyCallback}
        handleCreateCancelCallback={handleCreateCancelCallback}
        handleRepliesCallback={handleRepliesCallback}
        keyDownListener={keyDownListener}
      />
    </>
  );
};

export default observer(PostReplyContainer);
