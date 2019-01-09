import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };
  handleSubmit = e => {
    const { authError } = this.props;
    const { email, password } = this.state;
    e.preventDefault();
    //  console.log(this.state)
    this.props.signIn(this.state);
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  signInValidation() {
    console.log("update validation");
    const { email, password } = this.state;
    if (!email || !password) {
      return null;
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
    }
  }

  render() {
    const { authError, auth } = this.props;
    const { email, password } = this.state;
    const enabled = email.length > 0 && password.length > 3;

    if (auth.uid) return <Redirect to="/" />;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button
              className="btn orange lighten-2 z-depth-o"
              disabled={!enabled}
            >
              Login
            </button>
            {this.signInValidation()}
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
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

export default connect(
  mapStateToProps,
  { signIn }
)(SignIn);
