import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
import './tailwind.output.css';
import './App.css';

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Upload from "./components/upload.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
// import BoardUser from "./components/board-user.component";
// import BoardModerator from "./components/board-moderator.component";
// import BoardAdmin from "./components/board-admin.component";
import Nav from './components/nav.component';

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    // Regarding className for components, see
    // https://codesandbox.io/s/mq48rlj0pp?file=/src/index.js:329-350
    // formerly used https://tailwindcomponents.com/component/dark-navigation-component
    return (
      <React.Fragment>
        <header>
        <Nav />
        </header>
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/upload" component={Upload} />
        </Switch>
      </React.Fragment>
);
  }
}
/*
        <div className="w-full bg-indigo-100 h-full sm:p-0 md:p-10 xl:p-24">
          <div className="sm:w-full md:w-1/2 lg:w-1/2">
            <div className="bg-white shadow rounded-lg border">

*/
// TODO: (future) my gallery:
// nav:
/*
{currentUser && (
  <li className="nav-item">
    <Link to={"/user"} className="nav-link">
      My Gallery
    </Link>
  </li>
)}
*/
// article:
//             <Route path="/user" component={BoardUser} />

// TODO: (future) moderation (show hidden, only unhide ones my role hid):
// nav:
/*
            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}
*/
// article:
//             <Route path="/mod" component={BoardModerator} />

// TODO: (future) administration (federate, etc):
// nav:
/*
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}
*/
// article:
//            <Route path="/admin" component={BoardAdmin} />

export default App;

// (BezKoder, 2019b)
