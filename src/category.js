import React, { Component } from "react";
import ViewPost from "./post";
import AddPost from "./addpost";
import { Route, withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import "./App.css";
import * as APIS from "./commonapis";
import serializeForm from "form-serialize";
import uuid from "node-uuid";
import Moment from "react-moment";
import PageNotFound from "./pagenotfound";
class Category extends Component {
  state = {
    cat: [],
    posts: [],
    isCategoryAvailable: false
  };

  componentDidMount() {
    APIS.getCategories().then(data => {
      this.setState({ cat: data.categories });
    });
    APIS.getPostsbyCategory(this.props.category).then(data => {
      if (Object.keys(data).length == 0) {
        this.setState({ isCategoryAvailable: true });
        return;
      }
      this.setState({ posts: data });
    });
    let postsCount = 0;
    this.state.posts.map((post, index) => {
      APIS.getComments(post.id).then(data => {
        postsCount++;
        post["commentCount"] = data.length;
        if (postsCount == this.state.posts.length) {
          this.setState({ posts: this.state.posts });
        }
      });
    });
  }
  deletePost = (e, currPost) => {
    e.preventDefault();
    APIS.deletePost(currPost.id).then(res => {
      this.setState({
        posts: this.state.posts.filter(ele => ele.id != currPost.id)
      });
    });
  };

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
  getPostsByCategory = (e, categoryName) => {
    e.preventDefault();
    APIS.getPostsbyCategory(categoryName).then(data => {
      this.setState({ posts: data });
    });
    // this.context.history.push(`/${categoryName}`)
    this.props.history.push(`/${categoryName}`);
  };

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
        {this.state.isCategoryAvailable ? (
          <div>
            <PageNotFound />
          </div>
        ) : (
          <div>
            <div>
              <div>
                <Link to="/">back </Link>
              </div>
              <h1> All categories</h1>
              <ol>
                {this.state.cat.map((category, index) => (
                  <li key={index}>
                    Click to see
                    <Link
                      to={`/${category.name}`}
                      onClick={event =>
                        this.getPostsByCategory(event, category.name)
                      }
                    >
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
                      <Link to={`/${post.category}/${post.id}`}>
                        {" "}
                        {post.title}
                      </Link>
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
                      <b>Comment count : </b>
                      {post.commentCount}
                    </div>
                    <div>
                      <Link to={`/editpost/${post.id}`}>Edit Post</Link>
                    </div>
                    <div>
                      <button onClick={event => this.deletePost(event, post)}>
                        Delete Post
                      </button>
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

            {/* Addpost page */}

            {/* <Route
          path="/addpost"
          render={({ history }) => (
            <div>
                category view of addpost:
              <AddPost/>
            </div>
          )}
        /> */}

            {/* see post details */}

            {/* <Route
          path="/:category/:postid"
          Component={ViewPost}
          render={({ history }) => (
            <div>
              <ViewPost />
            </div>
          )}
        /> */}
          </div>
        )}
      </div>
    );
  }
}
export default Category;
