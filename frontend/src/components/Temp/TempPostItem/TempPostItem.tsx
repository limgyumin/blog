import React from "react";
import getDateFormat from "../../../util/lib/getDateFormat";
import PostType from "../../../util/types/Post";
import "./TempPostItem.scss";

interface TempPostItemProps {
  tempPost: PostType;
}

const TempPostItem = ({ tempPost }: TempPostItemProps) => {
  return (
    <>
      <div className="Temp-Post-Item">
        <div className="Temp-Post-Item-Info">
          <span className="temp-Post-Item-Info-Date">
            {getDateFormat(tempPost.created_at)}
          </span>
          <div className="Temp-Post-Item-Info-Title">
            <span>{tempPost.title}</span>
            <p>↗</p>
          </div>
          <span className="Temp-Post-Item-Info-Description">
            {tempPost.description}
          </span>
        </div>
      </div>
    </>
  );
};

export default TempPostItem;
