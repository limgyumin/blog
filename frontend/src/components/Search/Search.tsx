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
  notFound: boolean;
}

const Search = ({
  inputRef,
  inputFocusHandler,
  keyDownListener,
  setContentListener,
  searchedPost,
  postCount,
  notFound,
}: SearchProps) => {
  return (
    <>
      <div className="Search">
        <div className="Search-Container">
          <div className="Search-Container-Wrapper">
            <div
              className="Search-Container-Wrapper-Input"
              onClick={() => inputFocusHandler()}
            >
              <BsSearch />
              <input
                placeholder="Search Post"
                autoFocus
                onChange={(e) => setContentListener(e)}
                onKeyDown={(e) => keyDownListener(e)}
                ref={inputRef}
              />
            </div>
            {notFound ? (
              <p className="Search-Container-Wrapper-NotFound">
                No search results.
              </p>
            ) : postCount ? (
              <p className="Search-Container-Wrapper-Count">
                <span>{postCount} Posts</span> were found.
              </p>
            ) : (
              <></>
            )}
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
