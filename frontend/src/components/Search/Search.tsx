import React from "react";
import ReactHelmet from "components/common/ReactHelmet";
import { BsSearch } from "react-icons/bs";
import SearchPostItem from "./SearchPostItem";
import { THUMBNAIL_URL } from "config/config.json";
import useSearchPosts from "hooks/search/useSearchPosts";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./Search.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const Search = () => {
  const {
    keyword,
    posts,
    notFound,
    total,
    searchInputEl,
    handleFocusInput,
    handleChangeKeyword,
    handleClickInput,
    handleKeyDownInput,
  } = useSearchPosts();

  return (
    <React.Fragment>
      <ReactHelmet
        title="Search | Nonamed"
        description="개발자를 꿈꾸는 한 학생의 이야기"
        url="https://nonamed.blog/search"
        image={THUMBNAIL_URL}
      />
      <div className={cx("search")}>
        <div className={cx("search-wrap")}>
          <div className={cx("search-wrap-container")}>
            <div className={cx("search-wrap-container-input")} onClick={handleFocusInput}>
              <BsSearch onClick={handleClickInput} />
              <input
                placeholder="Search Post"
                autoFocus
                value={keyword}
                onChange={(e) => handleChangeKeyword(e)}
                onKeyDown={(e) => handleKeyDownInput(e)}
                ref={searchInputEl}
              />
            </div>
            {notFound ? (
              <p className={cx("search-wrap-container-notfound")}>No search results.</p>
            ) : (
              total > 0 && (
                <p className={cx("search-wrap-container-count")}>
                  <span>{total} Posts</span> were found.
                </p>
              )
            )}
          </div>
          <div className={cx("search-wrap-list")}>
            {posts.map((post) => (
              <SearchPostItem key={post.idx} post={post} />
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Search;
