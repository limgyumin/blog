import React from "react";
import PostType from "../../util/types/Post";
import "./Temp.scss";
import TempPostItem from "./TempPostItem";

interface TempProps {
  tempPosts: PostType[];
  deleteClickHandler: (idx: number) => void;
}

const Temp = ({ tempPosts, deleteClickHandler }: TempProps) => {
  return (
    <>
      <div className="Temp">
        <div className="Temp-Container">
          <h1 className="Temp-Container-Title">Saved Posts</h1>
          <h4 className="Temp-Container-Subtitle">
            임시 저장된 글 목록이 표시됩니다.
          </h4>
          <div className="Temp-Container-List">
            {tempPosts.map((tempPost, idx) => (
              <React.Fragment key={idx}>
                <TempPostItem
                  tempPost={tempPost}
                  deleteClickHandler={deleteClickHandler}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Temp;
