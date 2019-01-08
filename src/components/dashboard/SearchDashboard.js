import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import _ from "lodash";
import { storePosts, passingSearchTerm } from "../../store/actions/postActions";
import Post from "../posts/Post";

class SearchDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //  filteredPosts: [],
      postsToLoad: 2,
      lastIndex: 0
    };
  }

  componentWillMount() {
    this.props.storePosts();
    //  this.props.passingSearchTerm();
  }

  handleLoadMore() {
    const lastIndex = this.state.lastIndex + this.state.postsToLoad;
    this.setState({ lastIndex });
  }

  renderFilteredPosts() {
    const { filteredPosts } = this.props;
    const posts = _.slice(
      filteredPosts,
      0,
      this.state.lastIndex + this.state.postsToLoad
    );
    return (
      <div className="post-index">
        <div className="posts">
          {_.map(posts, (post, key) => {
            return <Post key={key} post={post} />;
          })}
        </div>

        <div className="load-more text-center">
          {this.state.lastIndex + this.state.postsToLoad <=
            filteredPosts.length && posts.length ? (
            <button
              className="btn btn-secondary text-center load-more-btn"
              onClick={this.handleLoadMore.bind(this)}
            >
              Load More
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }

  render() {
    return <div>{this.renderFilteredPosts()}</div>;
  }
}

const mapStateToProps = (state,ownProps) => {
  //  console.log(posts);
  return {
    //    posts: state.firestore.ordered.posts,
    auth: state.firebase.auth,
    storedPosts: state.posts.posts,
    filteredPosts: state.posts.filteredPosts,
    searchTerm: ownProps.match.params.searchTerm
  };
};

export default connect(
  mapStateToProps,
  { storePosts, passingSearchTerm }
)(SearchDashboard);
