import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import _ from "lodash";
import queryString from "query-string";
import { storePosts } from "../../store/actions/postActions";
import Post from "../posts/Post";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

class SearchDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredPosts: [],
      postsToLoad: 2,
      lastIndex: 0
    };
  }
  componentWillMount() {
    const { storedPosts, searchTerm } = this.props;
    this.props.storePosts();
    storedPosts.filter(post => {
      return post.title.toLowerCase().match(searchTerm);
    });
  }

  handleSearchBar(searchTerm) {
    const filteredPosts = this.props.posts.filter(post => {
      return post.title.toLowerCase().match(searchTerm);
    });

    this.setState({ filteredPosts: filteredPosts, lastIndex: 0 });
    this.props.history.push("/search" + searchTerm);
    console.log(filteredPosts);
  }

  handleLoadMore() {
    const lastIndex = this.state.lastIndex + this.state.postsToLoad;
    this.setState({ lastIndex });
  }

  renderFilteredPosts(filteredPosts) {
    console.log(filteredPosts);
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
    return <div>{this.renderFilteredPosts(this.state.filteredPosts)}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  return {
    //    posts: state.firestore.ordered.posts,
    //    auth: state.firebase.auth,
    storedPosts: state.posts.posts,
    searchTerm: ownProps.match.params.searchTerm
  };
};

export default connect(
  mapStateToProps,
  { storePosts }
)(SearchDashboard);
