import React from "react";
import { Link } from "react-router-dom";
import OtherPostsType from "../../../util/types/OtherPosts";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import "./PostList.scss";

interface PostListProps {
  otherPosts: Partial<OtherPostsType>;
}

const PostList = ({ otherPosts }: PostListProps) => {
  return (
    <>
      <div className="Post-List">
        {otherPosts.previous && (
          <div className="Post-List-Previous">
            <Link
              to={`/post/${otherPosts.previous?.idx}`}
              className="Post-List-Previous-Container"
            >
              <GrLinkPrevious />
              <div className="Post-List-Previous-Container-Content">
                <h3 className="Post-List-Previous-Container-Content-Name">
                  Previous Post
                </h3>
                <p className="Post-List-Previous-Container-Content-Title">
                  {otherPosts.previous?.title}
                </p>
              </div>
            </Link>
          </div>
        )}
        {otherPosts.next && (
          <div className="Post-List-Next">
            <Link
              to={`/post/${otherPosts.next?.idx}`}
              className="Post-List-Next-Container"
            >
              <div className="Post-List-Next-Container-Content">
                <h3 className="Post-List-Next-Container-Content-Name">
                  Next Post
                </h3>
                <p className="Post-List-Next-Container-Content-Title">
                  {otherPosts.next?.title}
                </p>
              </div>
              <GrLinkNext />
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default PostList;
