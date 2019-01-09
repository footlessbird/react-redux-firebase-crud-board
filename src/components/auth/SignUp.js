import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/actions/authActions";
import { showAlert } from "../layout/alert";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    //  console.log(this.state);
    this.props.signUp(this.state);
    const { authError } = this.props;
    const { email, password, firstName, lastName } = this.state;
    if (email && password && firstName && lastName && !authError) {
      showAlert("You have signed up successfully!");
    }
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  signUpValidation() {
    console.log("update validation");
    const { email, password, firstName, lastName } = this.state;

    if (!email || !password || !firstName || !lastName) {
      return (
        <div className="red-text center">
          <p>Please fill out the field(s)</p>
        </div>
      );
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      return (
        <div className="red-text center">
          <p>Invalid email address</p>
        </div>
      );
    } else if (password.length <= 3) {
      return (
        <div className="red-text center">
          <p>Password must be at least 4 digits or characters</p>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    const { auth, authError } = this.props;
    const { email, password, firstName, lastName } = this.state;
    const enabled =
      email.length > 0 &&
      password.length > 3 &&
      firstName.length > 0 &&
      lastName.length > 0;
    if (auth.uid) return <Redirect to="/" />;

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Sign Up</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button
              className="btn orange lighten-2 z-depth-o"
              disabled={!enabled}
            >
              Sign Up
            </button>
            {this.signUpValidation()}
            <div className="red-text center">
              {authError ? <p>{authError}</p> : null}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};

export default connect(
  mapStateToProps,
  { signUp }
)(SignUp);
