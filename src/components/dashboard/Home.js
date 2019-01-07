import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import _ from "lodash";
import Post from "../posts/Post";
import SearchBar from "./SearchBar";
import { storePosts } from "../../store/actions/postActions";
import Dashboard from "./Dashboard";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredPosts: [],
      postsToLoad: 2,
      lastIndex: 0
    };
  }

  componentWillMount() {
    this.props.storePosts();
  }

  handleSearchBar(searchTerm) {
    const { storedPosts } = this.props;
    console.log(storedPosts);
    const filteredPosts = storedPosts.filter(post => {
      return post.title.toLowerCase().match(searchTerm);
    });
    console.log(filteredPosts);
    this.setState({ filteredPosts: filteredPosts, lastIndex: 0 });
    this.props.history.push("/search");
  }
  handleLoadMore() {
    const lastIndex = this.state.lastIndex + this.state.postsToLoad;
    this.setState({ lastIndex });
  }

  renderFilteredPosts(filteredPosts) {
    const posts = _.slice(
      filteredPosts,
      0,
      this.state.lastIndex + this.state.postsToLoad
    );
    console.log(posts);
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
    const posts =
      this.props.location.pathname === "/post"
        ? this.props.storedPosts
        : this.state.filteredPosts;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(posts.length / this.state.postsPerPage); i++)
      pageNumbers.push(i);

    return (
      <div className="index-wrapper">
        <SearchBar onSubmit={this.handleSearchBar.bind(this)} />

        <Route exact path={`/`} component={Dashboard} />
        <Route path={`/posts`} component={Dashboard} />
        <Route
          path={`/search`}
          render={() => this.renderFilteredPosts(this.state.filteredPosts)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  //  console.log(posts);
  return {
    //  posts: state.firestore.ordered.posts,
    auth: state.firebase.auth,
    storedPosts: state.posts.posts
  };
};

export default connect(
  mapStateToProps,
  { storePosts }
)(Home);
