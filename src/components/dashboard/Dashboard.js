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

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      postsPerPage: 3
    };
  }

  componentWillReceiveProps(newProps) {
    // parse query string and set currenPage state accordingly
    const parsed = queryString.parse(newProps.location.search).page;
    if (parsed !== undefined) this.setState({ currentPage: parsed });
    else {
      this.setState({ currentPage: 1 });
    }
  }

  componentWillMount() {
    this.props.storePosts();
  }

  handlePaginationClick(e) {
    this.setState({ currentPage: e.target.id });
    this.props.history.push(`/post?page=${e.target.id}`);
  }

  handlePrevNextClick(e, pageNumbers, currentPage) {
    const lastPage = _.last(pageNumbers);

    //  when Prev button pressed
    if (currentPage > 1 && e.target.id === "prev") {
      let page = currentPage - 1;
      this.setState({ currentPage: page });
      this.props.history.push(`/post?page=${page}`);
    }
    //  when Next button pressed
    else if (currentPage < lastPage && e.target.id === "next") {
      let page = Number(currentPage) + 1;
      this.setState({ currentPage: page });
      this.props.history.push(`/post?page=${page}`);
    }
  }
  renderPosts() {
    const { currentPage, postsPerPage } = this.state;
    const { storedPosts } = this.props;
    const endIndex = currentPage * postsPerPage;
    //  console.log(endIndex);
    const startIndex = endIndex - postsPerPage;
    //  console.log(startIndex);
    const postsToShow = _.slice(storedPosts, startIndex, endIndex);
    //  console.log(postsToShow);
    //  console.log(this.props.storedPosts);
    return _.map(postsToShow, (post, key) => {
      //  console.log(key)
      console.log(post);
      return <Post key={key} post={post} />;
    });
  }

  render() {
    const { posts, auth, storedPosts } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    //  console.log(Array.isArray(storedPosts));
    //  console.log(storedPosts.length);

    // creating page numbers like [1][2][3] at the bottom of the layout
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(storedPosts.length / this.state.postsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    return (
      <div className="dashboard container" id="dashboard">
        <div className="row">
          <div className="col s12">
            <div className="post-list section">
              <ul className="collection col s12">{this.renderPosts()}</ul>
            </div>
          </div>
        </div>

        <div>
          <Pagination
            className="pagiantion"
            currentPage={this.state.currentPage}
            pageNumbers={pageNumbers}
            handlePrevNextClick={this.handlePrevNextClick.bind(this)}
            handlePaginationClick={this.handlePaginationClick.bind(this)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  //  console.log(posts);
  return {
    posts: state.firestore.ordered.posts,
    auth: state.firebase.auth,
    storedPosts: state.posts.posts
  };
};

export default compose(
  connect(
    mapStateToProps,
    { storePosts }
  ),
  firestoreConnect([
    {
      collection: "posts",
      orderBy: ["createdAt", "desc"]
    }
  ])
)(Dashboard);
