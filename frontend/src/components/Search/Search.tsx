import React from "react";
import { BsSearch } from "react-icons/bs";
import PostType from "../../util/types/Post";
import "./Search.scss";
import SearchPostItem from "./SearchPostItem";

interface SearchProps {
  inputRef: React.RefObject<HTMLInputElement>;
  inputFocusHandler: () => void;
  keyDownListener: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setContentListener: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchedPost: PostType[];
  postCount: number;
}

const Search = ({
  inputRef,
  inputFocusHandler,
  keyDownListener,
  setContentListener,
  searchedPost,
  postCount,
}: SearchProps) => {
  return (
    <>
      <div className="Search">
        <div className="Search-Container">
          <div
            className="Search-Container-Input"
            onClick={() => inputFocusHandler()}
          >
            <BsSearch />
            <input
              placeholder="검색어를 입력해주세요"
              autoFocus
              onChange={(e) => setContentListener(e)}
              onKeyDown={(e) => keyDownListener(e)}
              ref={inputRef}
            />
          </div>
          <div className="Search-Container-Posts">
            {searchedPost.map((post, idx) => (
              <React.Fragment key={idx}>
                <SearchPostItem post={post} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
