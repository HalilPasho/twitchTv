import React, { Component } from "react";

export class GoogleAuth extends Component {
  state = {
    isSignedIn: null
  };

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
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.authText);
        });
    });
  }

  authText = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  SignInButtonClick = () => {
    this.auth.signIn();
  };

  SignOutButtonClick = () => {
    this.auth.signOut();
  };

  AuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button onClick={this.SignOutButtonClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else if (this.state.isSignedIn === false) {
      return (
        <button onClick={this.SignInButtonClick} className="ui red google button">
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

export default GoogleAuth;
