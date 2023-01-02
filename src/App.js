import React, { Component } from "react";
import Login from "./component/Login";
import Home from "./component/Home";

import './assets/scss/base/init.scss';
export default class App extends Component {
  state = {
    user: {},
    error: null,
    authenticated: false
  };

  componentDidMount() {
    fetch(`${process.env.REACT_APP_SERVER_URL}/auth/success`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        this.setState({
          authenticated: true,
          user: responseJson.user
        });
      })
      .catch(error => {
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user"
        });
      });
  }

  render() {
    const { authenticated } = this.state;
    return (
      <div>
        <div>
          {!authenticated ? (
            <Login />
          ) : (
            <Home user={this.state.user.user} />
          )}
        </div>
      </div>
    );
  }

  _handleNotAuthenticated = () => {
    this.setState({ authenticated: false });
  };
}