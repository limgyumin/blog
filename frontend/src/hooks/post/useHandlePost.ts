import { useCallback, useEffect, useMemo, useState } from "react";
import isEmpty from "lib/isEmpty";
import { RootState } from "modules";
import {
  createPostThunk,
  createTempPostThunk,
  deletePostThunk,
  fetchPostThunk,
  initPostError,
  initPost,
  updatePostThunk,
} from "modules/post";
import { useBeforeunload } from "react-beforeunload";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { initialCreatePostState } from "types/initials/post.initial";
import { IPostDTO } from "types/post.type";
import getFileName from "lib/getFileName";
import usePostIdx from "hooks/util/usePostIdx";
import useInterval from "react-useinterval";

export default function useHandlePost() {
  const { error, data } = useSelector((state: RootState) => state.posts);
  const { post } = data;
  const { login, admin } = useSelector((state: RootState) => state.users.data);

  const dispatch = useDispatch();

  const postIdx = usePostIdx();
  const { pathname } = useLocation();
  const history = useHistory();

  const [valid, setValid] = useState<boolean>(false);
  const [request, setRequest] = useState<IPostDTO>(initialCreatePostState);

  const isUpdate = useMemo<boolean>(() => pathname.split("/")[1] === "update", [pathname]);

  const onChangeRequest = useCallback(
    (name: string, value: any) => {
      if (name in request) {
        setRequest({ ...request, [name]: value });
      }
    },
    [request]
  );

  const validHandler = useCallback(() => {
    const { title, content } = request;

    const emptyTitle = isEmpty(title);
    const emptyContent = isEmpty(content);

    const valid = !(emptyTitle || emptyContent);

    setValid(valid);
  }, [request]);

  const validatePost = useCallback(() => {
    const { description, category_idx } = request;

    const emptyDescription = isEmpty(description);
    const emptyCategory = category_idx <= 0;

    if (emptyDescription) {
      toast.warn("소개를 작성해주세요.");
      return false;
    }

    if (emptyCategory) {
      toast.warn("카테고리를 선택해주세요.");
      return false;
    }

    return true;
  }, [request]);

  const validateTempPost = useCallback(() => {
    const { title, content } = request;

    const emptyTitle = isEmpty(title);
    const emptyContent = isEmpty(content);

    if (emptyTitle) {
      toast.warn("제목을 작성해주세요.");
      return false;
    }

    if (emptyContent) {
      toast.warn("내용을 작성해주세요.");
      return false;
    }

    return true;
  }, [request]);

  const createPostHandler = useCallback(() => {
    if (!login || !admin) return;
    if (!validatePost()) return;

    const onCreatePost = () => {
      history.push("/");
      toast.success("우왕, 글 작성에 성공했어요!");
    };

    dispatch(createPostThunk(request, onCreatePost));
  }, [login, admin, request, history, dispatch, validatePost]);

  const createTempPostHandler = useCallback(() => {
    if (!login || !admin) return;
    if (!validateTempPost()) return;

    const onCreateTempPost = (idx: number) => {
      toast.success("글이 임시 저장되었습니다!");
      history.push(`/update/${idx}`);
    };

    dispatch(createTempPostThunk(request, onCreateTempPost));
  }, [login, admin, request, history, dispatch, validateTempPost]);

  const updatePostHandler = useCallback(
    (temp: boolean) => {
      if (!login || !admin) return;

      if (temp) {
        if (!validateTempPost()) return;
      } else {
        if (!validatePost()) return;
      }

      const onUpdatePost = () => {
        if (temp) {
          toast.success("글이 임시 저장되었습니다!");
        } else {
          toast.success("우왕, 글 수정에 성공했어요!");
          history.push(`/post/${postIdx}`);
        }
      };

      dispatch(updatePostThunk(postIdx, request, temp, onUpdatePost));
    },
    [login, admin, postIdx, request, history, dispatch, validatePost, validateTempPost]
  );

  const deletePostHandler = useCallback(() => {
    if (!login || !admin) return;

    const onDeletePost = () => {
      history.push("/");
      toast.success("우왕, 글 삭제에 성공했어요!");
    };

    dispatch(deletePostThunk(postIdx, onDeletePost));
  }, [login, admin, postIdx, history, dispatch]);

  const fetchPostHandler = useCallback(() => {
    if (isUpdate && !post.idx) {
      dispatch(fetchPostThunk(postIdx));
    }
  }, [isUpdate, post.idx, postIdx, dispatch]);

  const onCancelPost = useCallback(() => {
    history.push("/");
  }, [history]);

  const onSavePost = useCallback(() => {
    if (isUpdate) {
      updatePostHandler(true);
    } else {
      createTempPostHandler();
    }
  }, [isUpdate, createTempPostHandler, updatePostHandler]);

  const onSubmitPost = useCallback(() => {
    if (isUpdate) {
      updatePostHandler(false);
    } else {
      createPostHandler();
    }
  }, [isUpdate, createPostHandler, updatePostHandler]);

  useEffect(() => {
    if (isUpdate && postIdx) {
      setRequest({
        title: post.title,
        description: post.description,
        content: post.content,
        category_idx: post.fk_category_idx,
        thumbnail: getFileName(post.thumbnail),
      });
    }
  }, [isUpdate, postIdx, post]);

  useEffect(() => {
    fetchPostHandler();
  }, [fetchPostHandler]);

  useEffect(() => {
    validHandler();
  }, [validHandler]);

  useEffect(() => {
    return () => {
      setRequest(initialCreatePostState);
      setValid(false);
      dispatch(initPost());
    };
  }, [dispatch]);

  useEffect(() => {
    if (error && error.response) {
      if (error.response.status === 404) {
        history.push("/");
        toast.error("글 쓰기 부분에서 오류가 발생했어요!");
      }
      dispatch(initPostError());
    }
  }, [error, history, dispatch]);

  useInterval(onSavePost, 90000);

  useBeforeunload((e) => e.preventDefault());

  return {
    valid,
    request,
    onCancelPost,
    onSavePost,
    onSubmitPost,
    onChangeRequest,
    deletePostHandler,
  };
}
