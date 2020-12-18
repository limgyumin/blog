import React, { useCallback, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import Post from "../../components/Post";
import useStore from "../../util/lib/hooks/useStore";
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom";
import {
  LikeInfoResponse,
  OtherPostsResponse,
  PostResponse,
} from "../../util/types/Response";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import OtherPostsType from "../../util/types/OtherPosts";
import Portal from "../../components/common/Portal";
import ModalContainer from "../Modal/ModalContainer";
import PostDelete from "../../components/Post/PostDelete";

/**
 * PostContainer에서는 정말 Post에 관련된 로직만!!
 * Comment 로직에는 절대 관여하지 않아요.
 */

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
    handleDeletePost,
    handleOtherPosts,
    handlePostLike,
    handleLikeInfo,
  } = store.PostStore;
  const { login, admin } = store.UserStore;

  const [otherPosts, setOtherPosts] = useState<Partial<OtherPostsType>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const [scroll, setScroll] = useState<number>(0);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);

  const [deleting, setDeleting] = useState<boolean>(false);

  const postTopRef = useRef<HTMLDivElement>(null);

  // 글의 Idx
  const postIdx = Number(match.params.idx);

  // 글 조회
  const handlePostCallback = useCallback(async () => {
    setLoading(true);
    await handlePost(postIdx)
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
  }, [postIdx]);

  const handleDeletePostCallback = useCallback(async () => {
    setDeleting(true);
    await handleDeletePost(postIdx)
      .then((res: Response) => {
        setDeleting(false);
      })
      .catch((err: Error) => {
        toast.error("이런! 글 삭제에 실패했어요.");
        history.push("/");
      });
  }, [postIdx]);

  const handleOtherPostsCallback = useCallback(async () => {
    await handleOtherPosts(postIdx)
      .then((res: OtherPostsResponse) => {
        setOtherPosts(res.data.other_posts);
      })
      .catch((err: Error) => {
        toast.error("이런! 어딘가 문제가 있어요.");
        history.push("/");
      });
  }, [postIdx]);

  // 글 좋아요 및 좋아요 취소
  const handlePostLikeCallback = useCallback(async () => {
    if (login) {
      await handlePostLike(postIdx)
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

  // 글 좋아요 여부 조회
  const handleLikeInfoCallback = useCallback(async () => {
    await handleLikeInfo(postIdx)
      .then((res: LikeInfoResponse) => {
        setLikeCount(res.data["like_count"]);
        setLiked(res.data["liked"]);
      })
      .catch((err: Error) => {
        toast.error("이런! 좋아요 정보 조회에 실패했어요.");
        history.push("/");
      });
  }, [postIdx]);

  const deletePostHandler = useCallback(async () => {
    await handleDeletePostCallback();
    if (!deleting) {
      history.push("/");
    }
  }, [deleting]);

  const showModalCallback = useCallback(() => {
    if (isShow) {
      setTimeout(() => {
        setIsShow(!isShow);
      }, 500);
    } else {
      setIsShow(!isShow);
    }
    setIsOpen(!isOpen);
  }, [isShow]);

  const modifyClickHandler = () => {
    history.push(`/modify/${postIdx}`);
  };

  const progressBarHandler = () => {
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const progress = totalScroll / windowHeight;

    setScroll(progress);
  };

  const scrollToTop = () => {
    postTopRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToTop();
  }, [postIdx]);

  useEffect(() => {
    window.addEventListener("scroll", progressBarHandler);
    return () => window.removeEventListener("scroll", progressBarHandler);
  }, []);

  useEffect(() => {
    handlePostCallback();
    return () => initPost();
  }, [handlePostCallback]);

  useEffect(() => {
    handleOtherPostsCallback();
    return () => setOtherPosts({});
  }, [handleOtherPostsCallback]);

  useEffect(() => {
    handleLikeInfoCallback();
    return () => {
      setLikeCount(0);
      setLiked(false);
    };
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
      <Portal elementId="modal-root">
        <ModalContainer isOpen={isOpen} isShow={isShow}>
          <PostDelete
            deletePostHandler={deletePostHandler}
            showModalCallback={showModalCallback}
          />
        </ModalContainer>
      </Portal>
      <Post
        post={post}
        loading={loading}
        notFound={notFound}
        likeCount={likeCount}
        liked={liked}
        handlePostLikeCallback={handlePostLikeCallback}
        showModalCallback={showModalCallback}
        otherPosts={otherPosts}
        scroll={scroll}
        postTopRef={postTopRef}
        admin={admin}
        modifyClickHandler={modifyClickHandler}
      />
    </>
  );
};

export default withRouter(observer(PostContainer));
