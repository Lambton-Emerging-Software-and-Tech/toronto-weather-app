import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Clock from "./components/Clock";
import Weather from "./components/Weather";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
        
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/clock" element={<Clock />} />
        <Route exact path="/weather" element={<Weather />} />
        <Route exact path="/aboutus" element={<AboutUs />} />
        <Route exact path="/contactus" element={<ContactUs />} />
        <Route exact path="/" element={<Clock />} />
        {/* <Route exact path="/aboutus" element={<AboutUs />} />
        <Route exact path="/contactus" element={<ContactUs />} />

        <Route exact="/dashboard" element={<ProtectedRoute />}>
          <Route exact path="/dashboard" element={<Dashboard />} /> */}
        {/* </Route> */}
      </Routes>
      </BrowserRouter>
    );
  }
}
