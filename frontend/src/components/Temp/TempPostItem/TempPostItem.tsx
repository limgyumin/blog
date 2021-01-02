import React from "react";
import { Link } from "react-router-dom";
import getDateFormat from "../../../util/lib/getDateFormat";
import PostType from "../../../util/types/Post";
import "./TempPostItem.scss";

interface TempPostItemProps {
  tempPost: PostType;
}

const TempPostItem = ({ tempPost }: TempPostItemProps) => {
  return (
    <>
      <Link to={`/modify/${tempPost.idx}`} className="Temp-Post-Item">
        <div className="Temp-Post-Item-Info">
          <div className="Temp-Post-Item-Info-Wrapper">
            <p className="Temp-Post-Item-Info-Wrapper-Title">
              {tempPost.title}
            </p>
            <p className="Temp-Post-Item-Info-Wrapper-Content">
              {tempPost.content}
            </p>
          </div>
          <p className="Temp-Post-Item-Info-Date">
            {getDateFormat(tempPost.created_at)}
          </p>
        </div>
      </Link>
    </>
  );
};

export default TempPostItem;
