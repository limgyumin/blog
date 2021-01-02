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
          <p className="Temp-Container-Title">Saved Posts</p>
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
