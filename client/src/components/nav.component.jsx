import React, { Component } from 'react';
// import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
// import '../App.css';
import { TailwindNavbar } from 'tailwind-navbar-react';
import '../tailwind.output.css';
require('dotenv').config();
const API_URL = process.env.API_URL || "http://localhost:5000";
 

class Nav extends Component {
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

    // if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: (currentUser ? true : false) });
  }

  logOut() {
    // TODO: user's name still appears in nav after logout
    /*
    this.setState({ // TypeError: this is undefined
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    });
    */
    AuthService.logout();
  }
  
  render() {
    const { currentUser } = this.state;
    return(
      <TailwindNavbar
        brand={
          <img src={`${API_URL}/assets/logo32.png`} width="40" height="40" alt="ArtSpatter logo" />
        }
        className="py-1"
      >
        <nav>
          <ul className="items-center justify-between pt-4 text-base lg:flex lg:pt-0">
            <li>
              <Link
                to={"/home"}
                className="block px-0 py-3 border-b-2 border-transparent lg:p-4 hover:border-indigo-400"
                >
                Home
              </Link>
            </li>
            {currentUser ? (
            <React.Fragment>
              <li>
                <Link
                    to={"/profile"}
                    className="block px-0 py-3 border-b-2 border-transparent lg:p-4 hover:border-indigo-400"
                    >
                    {currentUser.username}'s profile
                </Link>
              </li>
              <li>
                <Link
                    to="/upload"
                    className="block px-0 py-3 border-b-2 border-transparent lg:p-4 hover:border-indigo-400"
                    >
                    Upload
                </Link>
              </li>
              <li>
                <Link
                    to="/login"
                    className="block px-0 py-3 border-b-2 border-transparent lg:p-4 hover:border-indigo-400"
                    onClick={this.logOut}
                    >
                    LogOut
                </Link>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li>
                <Link
                  to={"/login"}
                  className="block px-0 py-3 border-b-2 border-transparent lg:p-4 hover:border-indigo-400">
                    Login
                </Link>
              </li>
              <li>
                <Link
                  to={"/register"}
                  className="block px-0 py-3 border-b-2 border-transparent lg:p-4 hover:border-indigo-400">
                    Sign Up
                </Link>
              </li>
            </React.Fragment>
          )}

          </ul>
        </nav>
      </TailwindNavbar>

/*
        <Link to={"/"} className="w-1/5 flex flex-row flex-wrap justify-center content-center">
          <img alt="ArtSpatter logo" className="h-10" src={`${API_URL}/assets/logo32.png`}/>ArtSpatter
        </Link>
*/
    );
  }
}

export default Nav;