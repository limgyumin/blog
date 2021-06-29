import { useCallback, useEffect, useRef, useState } from "react";
import { RootState } from "modules";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import isEmpty from "lib/isEmpty";
import { fetchSearchedPostsThunk, initSearchError } from "modules/search";

export default function useSearchPosts() {
  const { error, data } = useSelector((state: RootState) => state.searches);
  const { notFound, total, posts } = data;

  const dispatch = useDispatch();

  const history = useHistory();

  const [keyword, setKeyword] = useState<string>("");

  const searchInputEl = useRef<HTMLInputElement>(null);

  const handleFetchSearchedPosts = useCallback(() => {
    if (isEmpty(keyword)) {
      toast.warn("검색어를 입력해주세요.");
      return;
    }

    dispatch(fetchSearchedPostsThunk(keyword));
  }, [keyword, dispatch]);

  const handleFocusInput = useCallback(() => {
    if (searchInputEl.current) {
      searchInputEl.current.focus();
    }
  }, [searchInputEl]);

  const handleChangeKeyword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setKeyword(value);
  }, []);

  const handleClickInput = useCallback(() => {
    handleFetchSearchedPosts();
  }, [handleFetchSearchedPosts]);

  const handleKeyDownInput = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const { key } = e;

      if (key === "Enter" || key === "NumpadEnter") {
        handleFetchSearchedPosts();
      }
    },
    [handleFetchSearchedPosts]
  );

  useEffect(() => {
    if (error) {
      toast.error("검색 부분에서 오류가 발생했어요!");
      dispatch(initSearchError());
      history.push("/");
    }
  }, [error, history, dispatch]);

  useEffect(() => {
    return () => setKeyword("");
  }, []);

  return {
    keyword,
    posts,
    notFound,
    total,
    searchInputEl,
    handleFocusInput,
    handleChangeKeyword,
    handleClickInput,
    handleKeyDownInput,
  };
}
