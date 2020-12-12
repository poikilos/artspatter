import React, { Component } from "react";

import UserService from "../services/user.service";
const reporting = require("../reporting");

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
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
      <section
        className="flex p-5 flex-col justify-center text-center"
        style={{ minWidth: "100vw", minHeight: "100vh" }}
      >
        <h3>{this.state.content}</h3>
      </section>
    );
  }
}

// (BezKoder, 2019b)
