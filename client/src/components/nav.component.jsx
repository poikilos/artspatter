import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../tailwind.output.css';
import '../App.css';
// import styled from "styled-components";
// ^ See https://codesandbox.io/s/mq48rlj0pp?file=/src/components/Nav.js:4599-4618
/*
import Login from "./login.component";
import Register from "./register.component";
import Upload from "./upload.component";
import Home from "./home.component";
import Profile from "./profile.component";
import BoardUser from "./board-user.component";
import BoardModerator from "./board-moderator.component";
import BoardAdmin from "./board-admin.component";
*/


class Nav extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    };
  }
  handleToggle(e) {
    e.preventDefault();
    this.setState({
    isExpanded: !this.state.isExpanded
    });
  }
  // Regarding className of components, see
  // https://tailwindcomponents.com/component/webpage-example-with-pure-tailwind-responsive-nav
  render() {
    const { currentUser } = this.state;
    return(
      /*
      <div>
        <div>
        */
      <div className="p-3 m-0 w-full flex flex-row flex-wrap bg-white shadow">
        <Link to={"/"} className="w-1/5 flex flex-row flex-wrap justify-center content-center">
          <img ald="ArtSpatter logo" className="h-10" src="public/artspatter.png"/>ArtSpatter
        </Link>
        <div className="sm:flex md:hidden z-50 w-4/5 flex flex-row flex-wrap justify-end content-center h-10">
          <button id="nav" className="text-gray-600 font-semibold px-1 text-2xl p-1 px-2 rounded bg-gray-20" type="button"><i className="transition-rotate fa fa-bars"></i></button>
        </div>
        <div id="nav-items" className="sm:border-l-4 md:border-none border-indigo-400 transition close sm:pt-16 md:pt-0 sm:h-full md:h-auto sm:absolute sm:right-0 sm:top-0 md:top-auto md:right-auto md:relative md:w-4/5 sm:bg-gray-900 sm:text-white md:text-gray-500 md:bg-transparent md:flex flex flex-row flex-wrap justify-center sm:content-start md:content-center">
          <Link
            to={"/home"}
            className="sm:py-3 sm:w-full sm:text-center sm:text-2xl md:text-left md:text-lg md:w-auto font-semibold px-1">
          Home
          </Link>

          {currentUser ? (
            <React.Fragment>
              <Link
                  to={"/profile"}
                  className="sm:py-3 sm:w-full sm:text-center sm:text-2xl md:text-left md:text-lg md:w-auto font-semibold px-1"
                  >
                  {currentUser.username}'s profile
              </Link>
              <a
                  href="/upload"
                  className="sm:py-3 sm:w-full sm:text-center sm:text-2xl md:text-left md:text-lg md:w-auto font-semibold px-1"
                  onClick={this.logOut}>
                  Upload
              </a>
              <a
                  href="/login"
                  className="sm:py-3 sm:w-full sm:text-center sm:text-2xl md:text-left md:text-lg md:w-auto font-semibold px-1"
                  onClick={this.logOut}>
                  LogOut
              </a>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link
                to={"/login"}
                className="sm:py-3 sm:w-full sm:text-center sm:text-2xl md:text-left md:text-lg md:w-auto font-semibold px-1">
                  Login
              </Link>

              <Link
                to={"/register"}
                className="sm:py-3 sm:w-full sm:text-center sm:text-2xl md:text-left md:text-lg md:w-auto font-semibold px-1">
                  Sign Up
              </Link>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default Nav;