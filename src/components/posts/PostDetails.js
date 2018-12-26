import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import moment from "moment";
import { Link } from "react-router-dom";
import { deletePost } from "../../store/actions/postActions";

class PostDetails extends Component {
  renderButtons(post) {
    if (this.props.auth.uid === post.authorId) {
      return (
        <div>
          <button className="btn orange lighten-2 z-depth-o">
            <Link to={"/update/" + this.props.postId} className="white-text">
              Update
            </Link>
          </button>
          <button
            onClick={this.onDeletePost.bind(this)}
            //  onClick={this.onDeletePost.bind(this, post.id)}
            className="btn orange lighten-2 z-depth-o"
          >
            Delete
          </button>
        </div>
      );
    }
  }

  onDeletePost() {
    this.props.deletePost(this.props.postId, () => {});
    this.props.history.push("/");
  }

  render() {
    const { post, auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    if (post) {
      return (
        <div className="container section post-details">
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title">{post.title}</span>
              <p>{post.content}</p>
            </div>
            <div className="card-action grey-text">
              <div>
                Posted by {post.authorFirstName} {post.authorLastName}
              </div>
              <div>{moment(post.createdAt.toDate()).calendar()}</div>
            </div>
            <div className="input-field">{this.renderButtons(post)}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="containor center">
          <p>It seems like, there is no post..</p>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const posts = state.firestore.data.posts;
  const post = posts ? posts[id] : null;
  //console.log(id);
  return {
    post: post,
    auth: state.firebase.auth,
    //  postArray: state.firestore.ordered.posts,
    postId: id
  };
};

export default compose(
  connect(
    mapStateToProps,
    { deletePost }
  ),
  firestoreConnect([{ collection: "posts" }])
)(PostDetails);
