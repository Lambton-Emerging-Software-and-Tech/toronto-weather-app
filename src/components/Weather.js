import React, { Component } from 'react'
import { fetchTorontoWeatherData } from '../services/weatherapi'

export default class Weather extends Component {

    componentDidMount = () => {
        fetchTorontoWeatherData()
        .then(function(response) {
            return response.json();
          }).then(function(data) {
            console.log("weather API Data for Toronto: ", data);
          })
    }

    render() {
        return (
            <div>Weather</div>
        )
    }
}
