import React, { useCallback, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import Search from "../../components/Search";
import useStore from "../../util/lib/hooks/useStore";
import PostType from "../../util/types/Post";
import { toast } from "react-toastify";
import { PostsResponse } from "../../util/types/Response";
import isEmpty from "../../util/lib/isEmpty";
import removeLastBlank from "../../util/lib/removeLastBlank";

const SearchContainer = ({}) => {
  const { store } = useStore();
  const { handleSearchPost } = store.PostStore;

  const [content, setContent] = useState<string>("");
  const [postCount, setPostCount] = useState<number>(0);
  const [searchedPost, setSearchedPost] = useState<PostType[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchPostCallback = useCallback(async () => {
    await handleSearchPost(removeLastBlank(content))
      .then((res: PostsResponse) => {
        console.log(res);
        setSearchedPost(res.data.posts);
        setPostCount(res.data.post_count);
      })
      .catch(() => {
        toast.error("이런! 글 검색에 실패했어요.");
      });
  }, [content]);

  const inputFocusHandler = () => {
    inputRef.current!.focus();
  };

  const setContentListener = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const keyDownListener = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isEmpty(content) && (e.key === "Enter" || e.key === "NumpadEnter")) {
      handleSearchPostCallback();
    }
  };

  return (
    <>
      <Search
        inputRef={inputRef}
        inputFocusHandler={inputFocusHandler}
        keyDownListener={keyDownListener}
        setContentListener={setContentListener}
        searchedPost={searchedPost}
        postCount={postCount}
      />
    </>
  );
};

export default observer(SearchContainer);
