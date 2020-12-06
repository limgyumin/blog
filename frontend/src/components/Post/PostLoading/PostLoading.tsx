import React from "react";
import "./PostLoading.scss";

interface PostLoadingProps {}

const PostLoading = ({}: PostLoadingProps) => {
  return (
    <>
      <div className="Post-Loading">
        <div className="Post-Loading-Wrap">
          <div className="Post-Loading-Wrap-Title">
            <span />
            <span style={{ width: "16rem" }} />
            <span />
            <span style={{ width: "4rem" }} />
            <span style={{ width: "10rem" }} />
          </div>
          <div className="Post-Loading-Wrap-Category">
            <span />
            <span />
            <span style={{ width: "10rem" }} />
            <span style={{ width: "5rem" }} />
          </div>
        </div>
        <span className="Post-Loading-Thumbnail" />
        <div className="Post-Loading-Wrapper">
          <div className="Post-Loading-Wrapper-Content">
            <span style={{ width: "10rem" }} />
            <span style={{ width: "5rem" }} />
            <span style={{ width: "8rem" }} />
            <span style={{ width: "9rem" }} />
            <span style={{ width: "5rem" }} />
            <span style={{ width: "5rem" }} />
            <span style={{ width: "14rem" }} />
            <span style={{ width: "3rem" }} />
            <span style={{ width: "7rem" }} />
            <span style={{ width: "4rem" }} />
            <span style={{ width: "5rem" }} />
            <span style={{ width: "8rem" }} />
            <span style={{ width: "5rem" }} />
            <span style={{ width: "7rem" }} />
            <span style={{ width: "5rem" }} />
            <span style={{ width: "7rem" }} />
            <span style={{ width: "5rem" }} />
            <span style={{ width: "5rem" }} />
            <span style={{ width: "9rem" }} />
          </div>
          <div className="Post-Loading-Wrapper-Content">
            <span style={{ width: "10rem" }} />
            <span style={{ width: "5rem" }} />
            <span style={{ width: "8rem" }} />
            <span style={{ width: "9rem" }} />
            <span style={{ width: "5rem" }} />
            <span style={{ width: "5rem" }} />
            <span style={{ width: "14rem" }} />
            <span style={{ width: "3rem" }} />
            <span style={{ width: "7rem" }} />
            <span style={{ width: "4rem" }} />
            <span style={{ width: "5rem" }} />
            <span style={{ width: "8rem" }} />
            <span style={{ width: "5rem" }} />
            <span style={{ width: "7rem" }} />
            <span style={{ width: "5rem" }} />
            <span style={{ width: "7rem" }} />
            <span style={{ width: "5rem" }} />
            <span style={{ width: "5rem" }} />
            <span style={{ width: "9rem" }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostLoading;
