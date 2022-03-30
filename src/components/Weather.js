import React, { Component } from "react";
import { fetchTorontoWeatherData } from "../services/weatherapi";

export default class Weather extends Component {
  state = {
    temperature: 0,
    feelsLikeTemperature: 0,
    city: "Toronto",
    imgsrc: "http://openweathermap.org/img/wn/10d@2x.png",
    status: "clear",
    wind: 0,
  };

  componentDidMount = () => {
    let that = this
    fetchTorontoWeatherData()
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log("weather API Data for Toronto: ", data);
        if (data?.name){
            let weather = data?.weather[0];
            that.setState({
                temperature: Math.round(parseInt(data?.main?.temp)),
                feelsLikeTemperature: Math.round(parseInt(data?.main?.feels_like)),
                wind: data?.wind?.speed,
                city: data?.name,
                status: weather?.main,
                imgsrc: "http://openweathermap.org/img/wn/" + weather?.icon + '@4x.png'
            })
        }
      });
  };

  render() {
    return (
      <div className="w-full flex items-center justify-center mt-10">
        <div
          className="block items-center font-bold justify-center gap-x-2 rounded-lg shadow-md"
          style={{ minWidth: "20rem", minHeight: "12rem" }}
        >
          <div className="rounded-md shadow-sm bg-skin-fill text-skin-light p-3 flex items-center gap-x-1">
            <div className="h-5 w-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                classname="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div>{this.state.city}</div>
          </div>
          <div className="flex item-center justify-between">
            <div className="block p-3">
              <div className="flex items-center">
                <div className="text-8xl">{this.state.temperature}</div>
                <div className="text-5xl">°C</div>
              </div>
              <div className="flex items-center font-light text-sm">
                  <div>Feels like: </div>
                  <div>{this.state.feelsLikeTemperature} °C</div>
              </div>
              <div className="flex items-center gap-x-1">
                <div className="h-6 w-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    xmlSpace="preserve"
                    style={{
                      fillRule: "evenodd",
                      clipRule: "evenodd",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeMiterlimit: 2,
                    }}
                  >
                    <path
                      d="M17 29.307h18M39.5 29.307h10.848A5.652 5.652 0 0 0 56 23.655v-.003A5.651 5.651 0 0 0 50.348 18h-4.372M17 34.693h8M33.446 34.693h16.902A5.651 5.651 0 0 1 56 40.345v.003A5.651 5.651 0 0 1 50.348 46h-4.372M8 17.921h22.726a2.719 2.719 0 0 0 2.72-2.72V15.2a2.719 2.719 0 0 0-2.72-2.72h-2.291M8 46.079h22.726a2.719 2.719 0 0 1 2.72 2.72v.001a2.719 2.719 0 0 1-2.72 2.72h-2.291"
                      style={{
                        fill: "none",
                        stroke: "#222a33",
                        strokeWidth: "1.5px",
                      }}
                    />
                  </svg>
                </div>
                <div className="font-light text-sm">{this.state.wind} m/sec</div>
              </div>
              
            </div>
            <div className="w-32 h-32 my-auto">
              <img
                className="h-full w-full"
                src={this.state.imgsrc}
                alt="weather state"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
