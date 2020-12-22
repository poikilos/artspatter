import React, { Component } from "react";
import UserService from "../services/user.service";
import PostService from "../services/post.service";
import '../tailwind.output.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { faBan } from '@fortawesome/free-solid-svg-icons'
import ImageCard from './imagecard.component.js';

const InfiniteScroll = require('react-infinite-scroll-component');
const reporting = require("../reporting");
const API_URL = process.env.API_URL || "http://localhost:5000";


// Conditional className:
// {`border-2 ${error ? 'border-red-500' : 'border-gray-300'} p-2`}
// ^ To include classes in the tailwind build, you must use
//   the full class names.
//   See <https://hackernoon.com/an-introductory-guide-to-
//   tailwind-and-react-setup-and-design-patterns-cm2r3wef>


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      pageNumber: 0,
      items: [],
      advance: 1,
      dummyPost: {
        pid: null,
        uid: null,
        title: "(untitled)",
        body: "",
        c: null,
        likes: 0,
      },
      testItems: [
        {
          pid: "a",
          thumb: "log",
        },
        {
          pid: "b",
          thumb: "next",
        },
      ],
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data,
        });
      },
      error => {
        this.setState({
          content: reporting.errorLeaf(error),
        });
      }
    );
    this.fetchMoreData();
    /*
    PostService.getPublicItems().then(
      response => {
        if (response.data.posts) {
          this.setState({
            content: response.data.message,
            items: response.data.posts,
          });
        }
        else {
          this.setState({
            content: (response.data.message ? response.data.message : null),
          });
        }
      },
      error => {
        this.setState({
          content: reporting.errorLeaf(error),
        });
      }
    ); // this.fetchMoreData();
    */
    // this.fetchMoreData();
  }

  fetchMoreData = () => {
    /*
    if (this.state.advance === null) {
      this.setState({
        advance: 1,
      });
    }
    else {
      this.setState({
        pageNumber: this.state.pageNumber + this.state.advance,
      });
    }
    */
    PostService.getPublicItems('art', this.state.pageNumber).then(
      response => {
        console.log("response.data.message: ", response.data.message);
        console.log("response.data.posts: ", response.data.posts);
        this.setState({
          items: this.state.items.concat(response.data.posts),
          pageNumber: this.state.pageNumber + this.state.advance,
        });
        console.log(`There are ${this.state.items.length} posts.`)
      },
      error => {
        this.setState({
          content: reporting.errorLeaf(error),
        });
      }
    )
  };

  fetchTestData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    this.setState({
      items: this.state.items.concat(Array.from({ pid: "a", uid: "i", thumb:"image1.png" }))
    });
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ pid: "a", uid: "i", thumb:"image1.png" }))
      });
    }, 1500);
    console.log("items", this.state.items);
  };

  /*
       <section
      className="flex p-5 flex-col justify-center text-center"
      style={{ minWidth: "100vw", minHeight: "100vh" }}
    >

  */

  render() {
    return (
      <section
        className="flex p-5 flex-col justify-center text-center"
        style={{ minWidth: "100vw", minHeight: "100vh" }}
      >
      {this.state.items.map(post => (
        (
          post
          ?
          <ImageCard post={post}/>
          :
          <ImageCard post={this.state.dummyPost}/>
        )
      ))}
    </section>
    );
  }
}
/*
<InfiniteScroll
          dataLength={this.state.items.length} //This is important field to render the next data
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>You saw it all.</b>
            </p>
          }
          // below props only if you need pull down functionality
          refreshFunction={this.refresh}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
          }
        >
        {this.state.items.map((post, index) => (
            <div >
              div - #{post.uid}
            </div>
          ))}
      </InfiniteScroll>
*/
/*
<div><br/><br/><br/><br/><br/>hello</div>
{this.state.items.map((post, index) => (
            <img src={API_URL+post.thumb} height="128px" width="128px"/>
          ))}
*/
/*
<React.Fragment>
        <section
          className="flex p-5 flex-col justify-center text-center"
          style={{ minWidth: "100vw", minHeight: "100vh" }}
        >
          <h3>{this.state.content}</h3>
        </section>
*/
/*
      <div className="flex">
        
        {this.state.items.map((post) => (
          <img src={API_URL+post.thumb} height="128px" width="128px" />
        ))}
      </div>
*/