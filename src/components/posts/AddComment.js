import React, { Component } from "react";
import { connect } from "react-redux";
import {addComment} from '../../store/actions/postActions'
export class AddComment extends Component {
  state = {
    comment: ""
  };

  handleSubmit = e => {
    const { auth, postId } = this.props;
    e.preventDefault();
    console.log(this.state);
    console.log(postId);
    this.props.addComment(postId, this.state);
  };

  handleChange = e => {
    this.setState({
      comment: e.target.value
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="input-field">
            <textarea
              id="comment"
              className="materialize-textarea"
              onChange={this.handleChange}
            />
          </div>
          <button className="btn orange lighten-2 z-depth-o">Comment</button>
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

export default connect(mapStateToProps, {addComment})(AddComment);
