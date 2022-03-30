import { weatherapi_token } from "../firebase-config";
import { baseWeatherAPI } from "./constants";

export const fetchTorontoWeatherData = () => {
    let headersList = {
        "Accept": "*/*",
       }
        let url = baseWeatherAPI + '?q=Toronto&' + 'appid=' + weatherapi_token + '&units=metric'
       return fetch(url, { 
         method: "GET",
         headers: headersList
       })
}