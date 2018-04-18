import React, { Component } from "react";
import { Link } from "react-router-dom";
import AddPost from "./addpost";
import serializeForm from "form-serialize";
import uuid from "node-uuid";
import { Route, withRouter } from "react-router-dom";
import * as APIS from "./commonapis";
import Moment from "react-moment";
import "./App.css";
import PageNotFound from "./pagenotfound";

class ViewPost extends Component {
  state = {
    post: undefined,
    comments: [],
    edit: false,
    addComment: false,
    body: "",
    isPostDeleted: false
  };

  componentDidMount() {
    APIS.getPostbyId(this.props.id).then(data => {
      if (Object.keys(data).length == 0) {
        this.setState({ isPostDeleted: true });
        return;
      }
      this.setState({ post: data });
    });

    APIS.getComments(this.props.id).then(data => {
      if (data.length && data[0].parentDeleted == true) {
        return;
      }
      this.setState({ comments: data });
    });
  }

  deletePost = (e, currPost) => {
    e.preventDefault();
    APIS.deletePost(currPost.id).then(res => {
      this.setState({
        post: undefined,
        comments: []
      });
    });
  };

  handleSubmitComment = e => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    const id = uuid.v4();
    const commentBody = JSON.stringify({
      id: id,
      timestamp: Date.now(),
      ...values,
      parentId: this.props.id
    });
    APIS.addComment(commentBody).then(data => {
      console.log(data);
      this.setState({
        comments: this.state.comments.concat([data]),
        addComment: false
      });
    });
  };

  editComment = (e, comment) => {
    e.preventDefault();
    const commentBody = JSON.stringify({
      timestamp: Date.now(),
      body: comment.editedBody
    });

    APIS.updateComment(commentBody, comment.id).then(data => {
      comment.body = data.body;
      comment.timestamp = data.timestamp;
      comment.is_editing = false;
      this.setState({
        comments: this.state.comments
      });
    });
  };
  setEditing = (e, comment) => {
    e.preventDefault();
    comment["is_editing"] = true;
    this.setState({
      comments: this.state.comments
    });
  };

  handleChangeComment = (e, comment) => {
    e.preventDefault();
    comment["editedBody"] = e.target.value;
  };

  deleteComment = (e, id) => {
    e.preventDefault();
    APIS.deleteComment(id).then(res => {
      this.setState({
        comments: this.state.comments.filter(ele => ele.id != id)
      });
    });
  };

  upvote(e, currComment) {
    e.preventDefault();

    const like = JSON.stringify({
      option: "upVote"
    });
    APIS.commentVote(like, currComment.id).then(() => {
      currComment.voteScore++;
      this.setState({
        comments: this.state.comments
      });
    });
  }
  downvote(e, currComment) {
    e.preventDefault();
    const dislike = JSON.stringify({
      option: "downVote"
    });
    APIS.commentVote(dislike, currComment.id).then(() => {
      currComment.voteScore--;
      this.setState({
        comments: this.state.comments
      });
    });
  }

  postsupvote(e, post) {
    e.preventDefault();
    const like = JSON.stringify({
      option: "upVote"
    });
    APIS.postVote(like, post.id).then(() => {
      post.voteScore++;
      this.setState({
        post: this.state.post
      });
    });
  }
  postsdownvote(e, post) {
    e.preventDefault();
    const dislike = JSON.stringify({
      option: "downVote"
    });
    APIS.postVote(dislike, post.id).then(() => {
      post.voteScore--;
      this.setState({
        post: this.state.post
      });
    });
  }

  hideAddCommentform(e) {
    e.preventDefault();
    if (this.state.addComment) {
      this.setState({ addComment: false });
    } else {
      this.setState({ addComment: true });
    }
  }
  render() {
    return (
      <div>
        {this.state.isPostDeleted ? (
          <div>
            <PageNotFound />
          </div>
        ) : (
          <div>
            <div>
              <Link to="/">back </Link>
            </div>
            {this.state.post == undefined ? (
              <div>go to back page</div>
            ) : (
              <div>
                <h4>Category: {this.state.post.category}</h4>
                <h4>Author:{this.state.post.author}</h4>
                <h4>Title: {this.state.post.title}</h4>
                <h4>
                  Time: <Moment date={this.state.post.timestamp} />
                </h4>
                <h4>Body:{this.state.post.body}</h4>
                <div>
                  <Link to={`/editpost/${this.state.post.id}`}>Edit Post</Link>
                </div>
                <div>
                  <button
                    onClick={event => this.deletePost(event, this.state.post)}
                  >
                    Delete Post
                  </button>
                </div>
                <div>
                  <button
                    onClick={event => this.postsupvote(event, this.state.post)}
                  >
                    Upvote
                  </button>{" "}
                  {this.state.post.voteScore}{" "}
                  <button
                    onClick={event =>
                      this.postsdownvote(event, this.state.post)
                    }
                  >
                    Downvote
                  </button>
                </div>
                <h4>Number of comments :{this.state.comments.length}</h4>
                <ol>
                  {this.state.comments.map((comment, index) => (
                    <li key={index}>
                      {comment.is_editing ? (
                        <h5>
                          Body :
                          <textarea
                            id="comment-textarea"
                            defaultValue={comment.body}
                            type="text"
                            name="body"
                            placeholder="content"
                            onChange={event =>
                              this.handleChangeComment(event, comment)
                            }
                          />{" "}
                          <button
                            onClick={event => this.editComment(event, comment)}
                          >
                            Submit
                          </button>
                        </h5>
                      ) : (
                        <h5>body:{comment.body}</h5>
                      )}
                      <h5>Author:{comment.author}</h5>
                      <h5>
                        Time:<Moment date={comment.timestamp} />
                      </h5>
                      <button
                        onClick={event => this.setEditing(event, comment)}
                      >
                        Edit comment
                      </button>
                      <button
                        onClick={event => this.deleteComment(event, comment.id)}
                      >
                        Delete comment
                      </button>
                      <div>
                        <button onClick={event => this.upvote(event, comment)}>
                          Upvote
                        </button>{" "}
                        {comment.voteScore}{" "}
                        <button
                          onClick={event => this.downvote(event, comment)}
                        >
                          Downvote
                        </button>
                      </div>
                    </li>
                  ))}
                </ol>

                <div>
                  <div>
                    <button onClick={event => this.hideAddCommentform(event)}>
                      Add Comment
                    </button>
                  </div>
                  {this.state.addComment === true ? (
                    <form onSubmit={event => this.handleSubmitComment(event)}>
                      <div>
                        body
                        <textarea
                          type="text"
                          name="body"
                          placeholder="content"
                        />
                      </div>
                      <div>
                        author
                        <input
                          type="text"
                          name="author"
                          placeholder="Author name"
                        />
                      </div>
                      <button>submit</button>
                    </form>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            )}
            <Route
              path="/addpost/:postid"
              Component={AddPost}
              render={match => (
                <div>
                  <AddPost id={match.params.postid} />
                </div>
              )}
            />
          </div>
        )}
      </div>
    );
  }
}
export default ViewPost;
