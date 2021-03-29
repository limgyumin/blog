import React, { useCallback, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import Post from "../../components/Post";
import useStore from "../../util/lib/hooks/useStore";
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom";
import { OtherPostsResponse, PostResponse } from "../../util/types/Response";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OtherPostsType from "../../util/types/OtherPosts";
import ModalContainer from "../Modal/ModalContainer";
import PostDelete from "../../components/Post/PostDelete";
import PostType from "../../util/types/Post";
import Portal from "../../components/common/Portal";
import ReactHelmet from "../../components/common/ReactHelmet";

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
  const { handlePost, handleDeletePost, handleOtherPosts } = store.PostStore;
  const { admin } = store.UserStore;

  const [post, setPost] = useState<Partial<PostType>>({});
  const [otherPosts, setOtherPosts] = useState<Partial<OtherPostsType>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);

  const [deleting, setDeleting] = useState<boolean>(false);

  const postTopRef = useRef<HTMLDivElement>(null);

  // 글의 Idx
  const postIdx = Number(match.params.idx);

  const REGEXP = /#+ |-+ |!+\[+.*\]+\(+.*\)|\`|\>+ |\[!+\[+.*\]+\(+.*\)|\<br+.*\>|\[.*\]\(.*\)/g;

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

  // 글 조회
  const handlePostCallback = useCallback(async () => {
    setLoading(true);
    await handlePost(postIdx)
      .then((res: PostResponse) => {
        if (!res.data.post) {
          setNotFound(true);
        }
        setLoading(false);
        setPost(res.data.post);
        handleOtherPostsCallback();
      })
      .catch((err: Error) => {
        if (err.message.indexOf("404")) {
          setNotFound(true);
        } else {
          toast.error("이런! 글 조회에 실패했어요.");
          history.push("/");
        }
      });
  }, [postIdx, handleOtherPostsCallback]);

  const deletePostHandler = useCallback(async () => {
    await handleDeletePostCallback();
    if (!deleting) {
      history.push("/");
    }
  }, [deleting, handleDeletePostCallback]);

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

  const scrollToTop = () => {
    postTopRef.current?.scrollIntoView();
  };

  const scrollToTopSmooth = () => {
    postTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    scrollToTop();
  }, [postIdx]);

  useEffect(() => {
    handlePostCallback();
    return () => setPost({});
  }, [handlePostCallback]);

  useEffect(() => {
    return () => setOtherPosts({});
  }, [handleOtherPostsCallback]);

  return (
    <>
      {post.idx && post && (
        <ReactHelmet
          title={post.title!}
          description={post
            .description!.replace(/ +/g, " ")
            .replace(REGEXP, "")}
          url={`https://nonamed.blog/post/${post.idx}`}
          image={post.thumbnail!}
        />
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
        postIdx={postIdx}
        post={post}
        loading={loading}
        notFound={notFound}
        showModalCallback={showModalCallback}
        otherPosts={otherPosts}
        postTopRef={postTopRef}
        scrollToTopSmooth={scrollToTopSmooth}
        admin={admin}
        modifyClickHandler={modifyClickHandler}
      />
    </>
  );
};

export default withRouter(observer(PostContainer));
