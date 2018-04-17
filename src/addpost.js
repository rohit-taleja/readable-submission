import React, { Component } from "react";
import { Link } from "react-router-dom";
import serializeForm from "form-serialize";
import uuid from "node-uuid";
import * as APIS from "./commonapis";
import Moment from "react-moment";
import "./App.css";

class AddPost extends Component {
  state = {
    post: {},

    hide: false
  };
  componentDidMount() {
    if (this.props.id) {
      APIS.getPostbyId(this.props.id).then(data => {
        this.setState({ post: data });
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    const id = uuid.v4();

    if (this.props.id) {
      const editBody = JSON.stringify({
        title: values.title,
        body: values.body
      });
      APIS.updatePost(editBody, this.props.id).then(ddd => {
        this.handleClick();
      });
    } else {
      const postBody = JSON.stringify({
        id: id,
        timestamp: Date.now(),
        ...values
      });
      APIS.addPost(postBody).then(data => {
        this.handleClick();
      });
    }
  };

  handleClick = () => {
    this.setState({ hide: true });
  };
  handleChange = e => {
    e.preventDefault();
  };
  render() {
    return (
      <div>
        <Link to="/">Back </Link>
        
        {this.state.hide ? (
          <div>operaton sucessfully</div>
        ) : (
          <div>
           
            <form onSubmit={event => this.handleSubmit(event)}>
              {this.props.id ? (
                <div>
                  <br/>
                  <div id="editpost-title">
                  Title : {" "} 
                  <input   class="inputsize"
                    defaultValue={this.state.post.title}
                    onChange={this.handleChange}
                    type="text"
                    name="title"
                    placeholder="edit title"
                  />
                  </div>
                  <br/>
                  <div id="editpost-body">
                  Body : {" "}
                  <textarea class="inputsize"
                    defaultValue={this.state.post.body}
                    onChange={this.handleChange}
                    type="text"
                    name="body"
                    placeholder="edit content"
                  />
                  </div>
                </div>
              ) : (
                <div>
                  <br/>
                  <div id="addpost-title">
                  Title : {" "}
                  <input  class="inputsize"
                    type="text" 
                    value={this.state.post.title}
                    name="title"
                    placeholder="Add title"
                  />
                  </div>
                  <br/>
                  <div id="addpost-body">
                  Body : {" "}
                  <textarea  class="inputsize"
                    type="text"
                    value={this.state.post.body}
                    name="body"
                    placeholder="content"
                  />
                  </div>
                </div>
              )}
              <br/>
              <div>
                Author : {" "}
                <input class="inputsize"
                  type="text"
                  value={this.state.post.author}
                  name="author"
                  placeholder="Author name"
                />
              </div>
              <br/><div>Category : {" "}
              <select class="inputsize" name="category" value={this.state.post.category}>
                <option>Select category</option>
                <option>react</option>
                <option>redux</option>
                <option>udacity</option>
              </select> </div><br/>
              <div>
              <button> Submit</button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}
export default AddPost;
