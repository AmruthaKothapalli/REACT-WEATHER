import React, { Component } from "react";
import Weather from "./component/Weather";

export default class App extends Component {
  render() {
    console.log(this);
    return (
      <div>
        <Weather></Weather>
      </div>
    );
  }
}
