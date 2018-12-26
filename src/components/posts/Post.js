import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import _ from "lodash";

const Post = ({ post }) => {
 //  console.log(post);
 //  console.log(post.id);
  console.log(post.data());
  return (
    <li className="collection-item row">
      <Link to={`/post/${post.id}`}>
        <h6>
          <strong>{post.data().title}</strong>
        </h6>
        <ul>
          <li>
            <span className="black-text">
              written by {post.data().authorFirstName}{" "}
              {post.data().authorLastName}
            </span>
          </li>
          <li>
            <span className="grey-text">
              {moment(post.data().createdAt.toDate()).calendar()}
            </span>
          </li>
        </ul>
      </Link>
    </li>
  );
};

export default Post;
