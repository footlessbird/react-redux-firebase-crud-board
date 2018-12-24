import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { storePosts } from "../../store/actions/postActions";
import Pagination from "react-paginating";

const fruits = ["apple", "melon", "cherry", "mango", "orange"];

class Pages extends Component {
  componentWillMount() {
    //  console.log(this.props)
    this.props.storePosts();
    console.log('after storePosts')
  }

  state = {
    currentPage: 1
  };

  handlePageChange = page => {
    this.setState({
      currentPage: page
    });
  };

  render() {
    const { posts } = this.props;
    console.log(Array.isArray(posts))
    console.log(posts.length)
    const limit = 2;
    const pageCount = 3;
    const total = posts.length * limit;
    console.log(total)
    const { currentPage } = this.state;

    return (
      <div>
        <h1>Pages</h1>
        <ul>
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    // posts: state.firestore.data, // objects
    // posts: state.firestore.ordered.posts // array

    posts: state.post.posts
  };
};

export default compose(
  connect(
    mapStateToProps,
    { storePosts }
  ),
  firestoreConnect([{ collection: "posts", orderBy: ["createdAt", "desc"] }])
)(Pages);
