import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import Post from "../../components/Post";
import useStore from "../../util/lib/hooks/useStore";
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom";
import {
  CommentCountResponse,
  CommentsResponse,
  LikeInfoResponse,
  PostResponse,
} from "../../util/types/Response";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import removeLastBlank from "../../util/lib/removeLastBlank";
import validateContent from "../../util/lib/validateContent";

interface PostContainerProps extends RouteComponentProps<MatchType> {}

interface MatchType {
  idx: string;
}

const PostContainer = ({ match }: PostContainerProps) => {
  const history = useHistory();
  const { store } = useStore();
  const {
    post,
    initPost,
    handlePost,
    handlePostLike,
    handleLikeInfo,
  } = store.PostStore;
  const {
    comments,
    initComments,
    handleCommentCount,
    handleCreateComment,
    handleComments,
    handleModifyComment,
  } = store.CommentStore;
  const { login } = store.UserStore;

  const [loading, setLoading] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);

  const [comment, setComment] = useState<string>("");
  const [commentCount, setCommentCount] = useState<number>(0);

  const { idx } = match.params;
  const handlePostCallback = useCallback(async () => {
    setLoading(true);
    await handlePost(Number(idx))
      .then((res: PostResponse) => {
        setLoading(false);
      })
      .catch((err: Error) => {
        if (err.message.indexOf("404")) {
          setNotFound(true);
        } else {
          toast.error("이런! 글 조회에 실패했어요.");
          history.push("/");
        }
      });
  }, []);

  const handlePostLikeCallback = useCallback(async () => {
    if (login) {
      await handlePostLike(Number(idx))
        .then((res: Response) => {
          handleLikeInfoCallback();
        })
        .catch((err: Error) => {
          if (err.message.indexOf("401")) {
            toast.info("로그인 후 좋아요를 누르실 수 있어요.");
          } else {
            toast.error("이런! 어딘가 문제가 있어요.");
            history.push("/");
          }
        });
    } else {
      toast.info("로그인 후 좋아요를 누르실 수 있어요.");
    }
  }, [login]);

  const handleLikeInfoCallback = useCallback(async () => {
    await handleLikeInfo(Number(idx))
      .then((res: LikeInfoResponse) => {
        setLikeCount(res.data["like_count"]);
        setLiked(res.data["liked"]);
      })
      .catch((err: Error) => {
        toast.error("저런! 좋아요 정보 조회에 실패했어요.");
        history.push("/");
      });
  }, []);

  const handleCommentCountCallback = useCallback(async () => {
    await handleCommentCount(Number(idx))
      .then((res: CommentCountResponse) => {
        setCommentCount(res.data["total_count"]);
      })
      .catch((err: Error) => {
        history.push("/");
      });
  }, [comments]);

  const handleCreateCommentCallback = useCallback(async () => {
    if (login) {
      if (!validateContent(comment)) {
        toast.error("내용을 작성해주세요.");
        return;
      }
      await handleCreateComment(Number(idx), comment)
        .then((res: Response) => {
          setComment("");
          handleCommentsCallback();
        })
        .catch((err: Error) => {
          if (err.message.indexOf("401")) {
            toast.info("로그인 후 댓글을 작성하실 수 있어요.");
          } else {
            toast.error("으악! 댓글 작성에 실패했어요.");
            history.push("/");
          }
        });
    } else {
      toast.info("로그인 후 댓글을 작성하실 수 있어요.");
    }
  }, [comment, login]);

  const handleCommentsCallback = useCallback(async () => {
    await handleComments(Number(idx))
      .then((res: CommentsResponse) => {})
      .catch(() => {
        toast.error("앗! 댓글 조회에 실패했어요.");
        history.push("/");
      });
  }, []);

  const handleModifyCommentCallback = useCallback(
    async (commentIdx: number, content: string) => {
      await handleModifyComment(commentIdx, removeLastBlank(content))
        .then((res: Response) => {
          handleCommentsCallback();
        })
        .catch((err: Error) => {
          toast.error("이런! 댓글 수정에 실패했어요.");
          history.push("/");
        });
    },
    []
  );

  const keyDownListener = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      validateContent(comment) &&
      (e.key === "Enter" || e.key === "NumpadEnter") &&
      !e.shiftKey
    ) {
      handleCreateCommentCallback();
    }
  };

  useEffect(() => {
    handleCommentCountCallback();
  }, [handleCommentCountCallback]);

  useEffect(() => {
    handleCommentsCallback();
    return () => initComments();
  }, [handleCommentsCallback]);

  useEffect(() => {
    handlePostCallback();
    return () => initPost();
  }, [handlePostCallback]);

  useEffect(() => {
    handleLikeInfoCallback();
  }, [handleLikeInfoCallback]);

  return (
    <>
      {post.idx && post && (
        <Helmet>
          <title>{post.title}</title>
          <meta
            name="description"
            content={post.description
              .replace(/ +/g, " ")
              .replace(
                /#+ |-+ |!+\[+.*\]+\(+.*\)|\`|\>+ |\[!+\[+.*\]+\(+.*\)|\<br+.*\>|\[.*\]\(.*\)/g,
                ""
              )}
          />
          <meta property="og:title" content={post.title} />
          <meta
            property="og:description"
            content={post.description
              .replace(/ +/g, " ")
              .replace(
                /#+ |-+ |!+\[+.*\]+\(+.*\)|\`|\>+ |\[!+\[+.*\]+\(+.*\)|\<br+.*\>|\[.*\]\(.*\)/g,
                ""
              )}
          />
          <meta property="twitter:title" content={post.title} />
          <meta
            property="twitter:description"
            content={post.description
              .replace(/ +/g, " ")
              .replace(
                /#+ |-+ |!+\[+.*\]+\(+.*\)|\`|\>+ |\[!+\[+.*\]+\(+.*\)|\<br+.*\>|\[.*\]\(.*\)/g,
                ""
              )}
          />
        </Helmet>
      )}
      <Post
        post={post}
        loading={loading}
        notFound={notFound}
        likeCount={likeCount}
        liked={liked}
        handlePostLikeCallback={handlePostLikeCallback}
        comment={comment}
        setComment={setComment}
        handleCreateCommentCallback={handleCreateCommentCallback}
        handleModifyCommentCallback={handleModifyCommentCallback}
        comments={comments}
        commentCount={commentCount}
        keyDownListener={keyDownListener}
      />
    </>
  );
};

export default withRouter(observer(PostContainer));
