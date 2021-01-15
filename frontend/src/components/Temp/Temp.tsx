import React from "react";
import PostType from "../../util/types/Post";
import "./Temp.scss";
import TempPostItem from "./TempPostItem";

interface TempProps {
  tempPosts: PostType[];
}

const Temp = ({ tempPosts }: TempProps) => {
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
                <TempPostItem tempPost={tempPost} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Temp;
