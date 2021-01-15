import React from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import getDateFormat from "../../../util/lib/getDateFormat";
import PostType from "../../../util/types/Post";
import "./TempPostItem.scss";

interface TempPostItemProps {
  tempPost: PostType;
  deleteClickHandler: (idx: number) => void;
}

const TempPostItem = ({ tempPost, deleteClickHandler }: TempPostItemProps) => {
  return (
    <>
      <div className="Temp-Post-Item">
        <div className="Temp-Post-Item-Info">
          <Link
            to={`/modify/${tempPost.idx}`}
            className="Temp-Post-Item-Info-Wrapper"
          >
            <h3 className="Temp-Post-Item-Info-Wrapper-Title">
              {tempPost.title}
            </h3>
            <p className="Temp-Post-Item-Info-Wrapper-Content">
              {tempPost.content}
            </p>
          </Link>
          <div className="Temp-Post-Item-Info-Bottom">
            <p className="Temp-Post-Item-Info-Bottom-Date">
              {getDateFormat(tempPost.created_at)}
            </p>
            <FaTrash onClick={() => deleteClickHandler(tempPost.idx)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TempPostItem;
