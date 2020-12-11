import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;
    // See <https://tailwindui.com/components/application-ui/lists/tables> regarding table+other className
    // formerly https://tailwindcomponents.com/component/table
    return (
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      {(this.state.userReady) ?
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong>
          </h3>
        </header>
        <table className="min-w-full divide-y divide-gray-200" style={{textAlign: "left"}}>
          <tr>
          <td className="px-6 py-4 whitespace-nowrap">Token:</td>{" "}
          <td className="px-6 py-4 whitespace-nowrap">
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
          </td>
        </tr>
        <tr>
          <td className="px-6 py-4 whitespace-nowrap">Id:</td>{" "}
          <td className="px-6 py-4 whitespace-nowrap">{currentUser.id}</td>
        </tr>
        <tr>
          <td className="px-6 py-4 whitespace-nowrap">Email:</td>{" "}
          <td className="px-6 py-4 whitespace-nowrap">{currentUser.email}</td>
        </tr>
        <tr>
          <td className="px-6 py-4 whitespace-nowrap">Authorities:</td>
          <td className="px-6 py-4 whitespace-nowrap">
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <span key={index}>{role}</span> )}
          </td>
        </tr>
      </table>
    </div>: null}
    </div></div></div>
    );
  }
}

// (BezKoder, 2019b)
