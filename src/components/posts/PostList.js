import React from "react";
import { Link } from "react-router-dom";

const PostList = ({ posts }) => {
  function renderPost() {
    return posts &&
      posts.map(post => {
        return (
          <li className="collection-item" key={post.id}>
            <Link to={"/post/" + post.id}>
              <h6><strong>{post.title}</strong></h6>
              <span className="">written by {post.id}</span>
            </Link>
          </li>
        );
      });
  }

  return (
    /*
    <div className="post-list section">
      <table className="striped">
        <thead>
          <tr>
            <th>No.</th>
            <th>Title</th>
            <th>Writer</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {posts &&
            posts.map(post => {
              return (
                <tr key={post.id}>
                  <Link to={"/post/" + post.id}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.content}</td>
                    <td>7th December, 12am</td>
                  </Link>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
    */

    <div className="post-list section">
      <ul className="collection col s12">{renderPost()}</ul>
    </div>
  );
};

export default PostList;

