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
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="Post-Loading-Wrap-Category">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        <span className="Post-Loading-Thumbnail" />
      </div>
    </>
  );
};

export default PostLoading;
