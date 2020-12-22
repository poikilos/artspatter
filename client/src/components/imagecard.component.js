import React, { Component } from 'react';
// import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
// import '../App.css';
import '../tailwind.output.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { faBan } from '@fortawesome/free-solid-svg-icons'

require('dotenv').config();
const API_URL = process.env.API_URL || "http://localhost:5000";
 

class ImageCard extends Component {
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
  
  render() {
    const { currentUser } = this.state;
    return(
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        {
          this.props.post.thumb
          ?
          (
            <img alt={this.props.post.title ? this.props.post.title : "(untitled)"} className="w-full" src={this.props.post.thumb.startsWith("/") ? API_URL + this.props.post.thumb : this.props.post.thumb} key={this.props.post.pid} alt={this.props.post.title} width="128" height="128"/>
          )
          : <FontAwesomeIcon icon={faBan} />
          }
        <div className="px-6 py-4">
        <div className="font-bold text-purple-500 text-xl mb-2">
          {this.props.post.title ? this.props.post.title : "(untitled)"}
        </div>
        <p className="text-gray-700 text-base">
        by user {this.props.post.uid ? this.props.post.uid : "(anonymous)"}: {this.props.post.body ? this.props.post.body : "(untitled)"} <span></span>
        </p>
      </div>
      </div>
    );
  }
}
// TODO: the title and body are both getting the form value title:
// : {this.props.post.body ? this.props.post.body : "(untitled)"}

/*
        <Link to={"/"} className="w-1/5 flex flex-row flex-wrap justify-center content-center">
          <img alt="ArtSpatter logo" className="h-10" src={`${API_URL}/assets/logo32.png`}/>ArtSpatter
        </Link>
*/

export default ImageCard;