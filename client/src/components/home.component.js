import React, { Component } from "react";

import UserService from "../services/user.service";
const reporting = require("../reporting");

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      statusImage: "",
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content: reporting.errorLeaf(error),
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <img src="{this.state.statusImage}"/>
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
      </div>
    );
  }
}

// (BezKoder, 2019b)
