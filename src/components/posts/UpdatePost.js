import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { updatePost } from "../../store/actions/postActions";
import {showAlert} from '../layout/alert'

class UpdatePost extends Component {
  componentWillMount() {
    console.log(this.props);
    this.setState({
      title: this.props.post.title,
      content: this.props.post.content
    });
  }

  updateValidation() {
    console.log("update validation");
    console.log(this.state.title);
    console.log(this.state.content);

    if (this.state.title && this.state.content) {
      return null;
    } else {
      return (
        <div className="red-text center">
          <p>Please fill out the field(s)</p>
        </div>
      );
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.updatePost(this.props.postId, this.state);
    /*
    console.log(this.state.title);
    console.log(this.state.content);
    */
    this.props.history.push("/");
    showAlert('Your post successfully updated!')

  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    //  console.log(this.state);
    const { auth } = this.props;
    const { title, content } = this.state;
    const enabled = title.length > 0 && content.length > 0;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Update Post</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              className="materialize-textarea"
              value={content}
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field">
            <button
              className="btn orange lighten-2 z-depth-o"
              disabled={!enabled}
            >
              Update
            </button>
            {this.updateValidation()}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const posts = state.firestore.data.posts;
  const post = posts ? posts[id] : null;
  //  console.log(post);
  return {
    auth: state.firebase.auth,
    post: post,
    postId: id
  };
};

export default compose(
  connect(
    mapStateToProps,
    { updatePost }
  ),
  firestoreConnect([{ collection: "posts" }])
)(UpdatePost);
