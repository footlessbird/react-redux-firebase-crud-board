import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import moment from "moment";
import { Link } from "react-router-dom";
import {
  deletePost,
  addComment,
  storeComments
} from "../../store/actions/postActions";
import _ from "lodash";
import AddComment from "./AddComment";
import Comment from "./Comment";

class PostDetails extends Component {
  componentWillMount(){
    const {postId} = this.props 
    this.props.storeComments(postId)
  }
  renderComments() {
    const { postId, comments } = this.props;
    console.log(comments);    
    
    return _.map(comments, (comment, key) => {
      if(postId===comment.postId)
      return (
        <Comment postId={postId} key={key} comment={comment}>
          {comment.comment}
        </Comment>
      );
    });
  }

  renderButtons(post) {
    if (this.props.auth.uid === post.authorId) {
      return (
        <div id="update-buttons">
          <button className="btn orange lighten-2 z-depth-o">
            <Link id="update-button" to={"/update/" + this.props.postId} className="white-text">
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
    const { post, auth, match, firebase } = this.props;
    console.log(firebase);
    console.log(match.params.id);
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
              <div> {moment(post.createdAt).calendar()}</div>
            </div>
            <div className="input-field">{this.renderButtons(post)}</div>
          </div>
          <AddComment postId={match.params.id} />

          <div id="comment-container">{this.renderComments()}</div>
        </div>
      );
    } else {
      return (
        <div className="containor center">
          <p>It seems like, there is no post yet..</p>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const posts = state.firestore.data.posts;
  const post = posts ? posts[id] : null;
  return {
    post: post,
    auth: state.firebase.auth,
    //  postArray: state.firestore.ordered.posts,
    postId: id,
    //  storedPost: state.post
    firebase: state.firebase.ordered,
    //  comments: state.posts.comments
    posts: posts,
    comments: state.posts.comments
  };
};

export default compose(
  connect(
    mapStateToProps,
    { deletePost, addComment, storeComments }
  ),
  firestoreConnect([{ collection: "posts" }])
)(PostDetails);
