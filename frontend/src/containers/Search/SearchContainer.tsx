import React, { useCallback, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import Search from "../../components/Search";
import useStore from "../../util/lib/hooks/useStore";
import PostType from "../../util/types/Post";
import { toast } from "react-toastify";
import { PostsResponse } from "../../util/types/Response";
import isEmpty from "../../util/lib/isEmpty";
import removeLastBlank from "../../util/lib/removeLastBlank";
import ReactHelmet from "../../components/common/ReactHelmet";
import { THUMBNAIL_URL } from "../../config/config.json";

const SearchContainer = ({}) => {
  const { store } = useStore();
  const { handleSearchPost } = store.PostStore;

  const [content, setContent] = useState<string>("");
  const [postCount, setPostCount] = useState<number>(0);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [searchedPost, setSearchedPost] = useState<PostType[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchPostCallback = useCallback(async () => {
    setSearchedPost([]);
    await handleSearchPost(removeLastBlank(content))
      .then((res: PostsResponse) => {
        if (res.data.posts.length === 0) {
          setNotFound(true);
        } else {
          setNotFound(false);
          setSearchedPost(res.data.posts);
          setPostCount(res.data.post_count);
        }
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
      <ReactHelmet
        title="Search | Nonamed"
        description="개발자를 꿈꾸는 한 학생의 이야기"
        url="https://nonamed.blog/search"
        image={THUMBNAIL_URL}
      />
      <Search
        inputRef={inputRef}
        inputFocusHandler={inputFocusHandler}
        keyDownListener={keyDownListener}
        setContentListener={setContentListener}
        searchedPost={searchedPost}
        postCount={postCount}
        notFound={notFound}
      />
    </>
  );
};

export default observer(SearchContainer);
