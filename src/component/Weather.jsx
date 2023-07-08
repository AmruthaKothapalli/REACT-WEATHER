import React, { Component } from "react";
import "./Weather.css";
import clear from "./images/clear.png";
import wind from "./images/wind.png";
import clouds from "./images/clouds.png";
import drizzle from "./images/drizzle.png";
import humidity from "./images/humidity.png";
import mist from "./images/mist.png";
import rain from "./images/rain.png";
import snow from "./images/snow.png";
import haze from "./images/haze.jpg";

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      value: "",
      images: clear,
      error: "",
    };
  }
  inputHandle = (e) => {
    this.setState({ value: e.target.value });
  };
  getUserData = async (city) => {
    const Response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=cea9bb18676e1c0ba79108893fd24d9c`,
      {
        method: "GET",
      }
    );
    let errormsg = "invalid input";
    if (Response.status === 404) {
      this.setState({ error: errormsg });
    } else {
      console.log(Response);
      const data = await Response.json();
      console.log(data.weather);
      let imagesrc = "";
      if (data.weather[0].main !== "undefined") {
        if (data.weather[0].main === "Clear") {
          imagesrc = clear;
        } else if (data.weather[0].main === "Clouds") {
          imagesrc = clouds;
        } else if (data.weather[0].main === "Rain") {
          imagesrc = rain;
        } else if (data.weather[0].main === "mist") {
          imagesrc = mist;
        } else if (data.weather[0].main === "Drizzle") {
          imagesrc = drizzle;
        } else if (data.weather[0].main === "Snow") {
          imagesrc = snow;
        } else if (data.weather[0].main === "Haze") {
          imagesrc = haze;
        }
      }
      this.setState({
        userData: data,
        images: imagesrc,
      });
    }
  };
  componentDidMount() {
    if (this.state.value !== "") {
      this.getUserData();
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className="backgrdimg">
        <div>
          <div id="search">
            <h3>Weather App</h3>
            <hr />
            <input
              type="text"
              id="text"
              placeholder="Enter city"
              value={this.state.value}
              onChange={this.inputHandle}
            />

            <div id="error">
              <p>{this.state.error}</p>
            </div>

            <hr />
            <button
              id="btn"
              onClick={() => {
                this.getUserData(this.state.value);
              }}
            >
              GET
            </button>
          </div>
          {typeof this.state.userData.main !== "undefined" ? (
            <div id="report">
              <h3
                style={{
                  borderBottom: "1px solid lavender",
                  paddingBottom: "12px",
                }}
              >
                Weather Report
              </h3>
              <img
                src={this.state.images}
                height="100px"
                width="100px"
                alt="Not Loaded"
              />
              <div id="temp">
                {Math.round(this.state.userData.main.temp) + "°C"}
              </div>
              <h3 id="city">{this.state.userData.name}</h3>
              <br />
              <div id="display">
                <div id="hum">
                  <div>
                    <img
                      src={humidity}
                      height="20px"
                      width="20px"
                      alt=" Not Loaded"
                    />
                  </div>
                  <div>
                    <p id="humidity">
                      {this.state.userData.main.humidity + "%"}
                    </p>
                    <p style={{ fontSize: "12px" }}>humidity</p>
                  </div>
                </div>
                <div id="wind">
                  <div>
                    <img
                      src={wind}
                      height="20px"
                      width="20px"
                      alt="Not loaded"
                    />
                  </div>
                  <div>
                    <p id="windy">{this.state.userData.wind.speed + "km/h"}</p>
                    <p style={{ fontSize: "12px" }}>Wind speed</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
