import React, { Component } from "react";
import { connect } from "react-redux";
import { createPost } from "../../store/actions/postActions";
import { Redirect } from "react-router-dom";
import {showAlert} from '../layout/alert'

class CreatePost extends Component {
  state = {
    title: "",
    content: ""
  };
  
  /* dummy data maker for test
  componentWillMount() {
    for (let i = 0; i < 200; i++) {
      this.props.createPost(
        this.setState({
          title: "created data" + i,
          content: "created content" + i
        })
      );
    }
  }
*/

  createValidation() {
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
    console.log(this.state);
    this.props.createPost(this.state);
    this.props.history.push("/");
    showAlert('Your post successfully created!')
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    const { auth } = this.props;
    const { title, content } = this.state;
    const enabled = title.length > 0 && content.length > 0;

    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create New Post</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              className="materialize-textarea"
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field">
            <button
              className="btn orange lighten-2 z-depth-o"
              disabled={!enabled}
            >
              Create
            </button>
            {this.createValidation()}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(
  mapStateToProps,
  { createPost }
)(CreatePost);
