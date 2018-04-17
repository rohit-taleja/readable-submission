import React, { Component } from "react";
import ViewPost from "./post";
import AddPost from "./addpost";
import { Route, withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import "./App.css";
import * as APIS from "./commonapis";
import serializeForm from "form-serialize";
import uuid from "node-uuid";
import Category from "./category";
import Moment from "react-moment";

class App extends Component {
  state = {
    cat: [],
    posts: []
  };

  componentDidMount() {
    APIS.getCategories().then(data => {
      this.setState({ cat: data.categories });
    });
    APIS.getPosts().then(data => {
      this.setState({ posts: data });
    });
  }

  //addpost

  upvote(e, currPost) {
    e.preventDefault();

    const like = JSON.stringify({
      option: "upVote"
    });
    APIS.postVote(like, currPost.id).then(() => {
      currPost.voteScore++;
      this.setState({
        posts: this.state.posts
      });
    });
  }

  downvote(e, currPost) {
    e.preventDefault();
    const dislike = JSON.stringify({
      option: "downVote"
    });
    APIS.postVote(dislike, currPost.id).then(() => {
      currPost.voteScore--;
      this.setState({
        posts: this.state.posts
      });
    });
  }

  sortByVote = e => {
    e.preventDefault();
    this.state.posts.sort((a, b) => {
      return parseInt(a.voteScore) - parseInt(b.voteScore);
    });
    this.setState({ posts: this.state.posts });
  };

  sortByTimestamp = e => {
    e.preventDefault();
    this.state.posts.sort((a, b) => {
      return parseInt(a.timestamp) - parseInt(b.timestamp);
    });
    this.setState({ posts: this.state.posts });
  };

  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <h1> All categories</h1>
              <ol>
                {this.state.cat.map((category, index) => (
                  <li key={index}>
                    Click to see
                    <Link to={`/category/${category.name}`}>
                      {" "}
                      {category.name}{" "}
                    </Link>{" "}
                    posts
                  </li>
                ))}
              </ol>
              <div>
                <button onClick={this.sortByVote}>order by voteScore</button>
                <button onClick={this.sortByTimestamp}>
                  order by timestamp
                </button>
              </div>
              <h1>Posts</h1>
              <ol>
                {this.state.posts.map((post, index) => (
                  <li key={index}>
                    <div>
                      <b>Category : </b>
                      {post.category}
                    </div>
                    <div>
                      <b>Author : </b>
                      {post.author}
                    </div>
                    <div>
                      <b>title : </b>
                      <Link to={`/post/${post.id}`}> {post.title}</Link>
                    </div>
                    <div>
                      <b>Date and Time : </b>
                      <Moment date={post.timestamp} />
                    </div>

                    <div>
                      <b>Body : </b>
                      {post.body}
                    </div>

                    <div>
                      <button onClick={event => this.upvote(event, post)}>
                        upvote
                      </button>{" "}
                      <span> </span>
                      {post.voteScore} <span> </span>
                      <button onClick={event => this.downvote(event, post)}>
                        downvote
                      </button>
                    </div>
                    <br />
                  </li>
                ))}
              </ol>
              <div>
                {" "}
                <Link to="/addpost">Add a post</Link>{" "}
              </div>
            </div>
          )}
        />
        {/* Addpost page */}

        <Route
          path="/addpost"
          Component={AddPost}
          render={({ match }) => (
            <div>
              <AddPost />
            </div>
          )}
        />

        <Route
          path="/editpost/:postid"
          Component={AddPost}
          render={({ match }) => (
            <div>
              <AddPost id={match.params.postid} />
            </div>
          )}
        />

        {/* see post details */}

        <Route
          path="/post/:postid"
          Component={ViewPost}
          render={({ match }) => (
            <div>
              <ViewPost id={match.params.postid} />
            </div>
          )}
        />

        <Route
          path="/category/:category"
          Component={Category}
          render={({ match }) => (
            <div>
              <Category category={match.params.category} />
            </div>
          )}
        />
      </div>
    );
  }
}
export default App;
