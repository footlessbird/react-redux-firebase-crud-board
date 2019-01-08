import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import SearchBar from "./SearchBar";
import { storePosts, passingSearchTerm } from "../../store/actions/postActions";

class Navbar extends Component {
  handleSearchBar(searchTerm) {
    this.props.passingSearchTerm(searchTerm);
    if (window.location.href !== "/search") {
      window.location.href = "/search";
    }
  }

  render() {
    const { auth, profile } = this.props;
    const links = auth.uid ? (
      <SignedInLinks profile={profile} />
    ) : (
      <SignedOutLinks />
    );

    return (
      <nav className="nav-wrapper grey lighten-1">
        <div className="container">
          <Link to="/" className="brand-logo">
            SimpleCommunity
          </Link>
          {links}
          <SearchBar onSubmit={this.handleSearchBar.bind(this)} />
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  //  console.log(state);

  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(
  mapStateToProps,
  { passingSearchTerm }
)(Navbar);
