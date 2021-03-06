import React, { Component } from "react";
import { Link } from "react-router-dom";

class PageNotFound extends Component {
  render() {
    return (
      <div>
        <img
          src={require("./Page-not-found.png")}
          style={{
            width: 400,
            height: 400,
            display: "block",
            margin: "auto",
            position: "relative"
          }}
        />
        <center>
          <Link to="/">Return to Home Page</Link>
        </center>
      </div>
    );
  }
}
export default PageNotFound;
