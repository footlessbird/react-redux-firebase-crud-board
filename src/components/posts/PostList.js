import React from "react";

const PostList = ({ posts }) => {
  return (
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
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.content}</td>
                  <td>7th December, 12am</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default PostList;
