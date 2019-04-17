import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions/index";

export class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "557050877104-vb2kklobkpm9spdgqs5i7o1bkqekga7v.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.authText(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.authText);
        });
    });
  }

  authText = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  SignInButtonClick = () => {
    this.auth.signIn();
  };

  SignOutButtonClick = () => {
    this.auth.signOut();
  };

  AuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button
          onClick={this.SignOutButtonClick}
          className="ui red google button"
        >
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else if (this.props.isSignedIn === false) {
      return (
        <button
          onClick={this.SignInButtonClick}
          className="ui red google button"
        >
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.AuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
