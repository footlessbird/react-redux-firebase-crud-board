import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";

const Navbar = (props) => {
  const {auth} = props
  console.log(auth)
  return (
    <nav className="nav-wrapper grey lighten-1">
      <div className="container">
        <Link to="/" className="brand-logo">
          SimpleCommunity
        </Link>
        <SignedInLinks />
        <SignedOutLinks />
      </div>
    </nav>
  );
};
const mapStateToProps = state => {
  return{
      auth: state.firebase.auth
  }
};


export default connect(mapStateToProps)(Navbar);
