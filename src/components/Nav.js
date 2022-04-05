import React, { Component } from "react";
import { toast } from "react-toastify";
import { userLogout } from "../services/authentication";

export default class Nav extends Component {
  state = {
    displayName: "User",
    isLoggedIn: false,
  };
  componentDidMount = () => {
    let accessToken = JSON.parse(localStorage.getItem("access_token"));
    let displayName = JSON.parse(localStorage.getItem("displayName"));
    if (accessToken) {
      // console.log("Found User");
      this.setState({
        isLoggedIn: true,
        displayName,
      });
    }
  };

  LogoutUser = () => {
    let logoutToast = toast.loading('Logging you out....')
    userLogout()
    .then((response) => {
      toast.update(logoutToast, { type: toast.TYPE.SUCCESS, autoClose: 5000, render: "Login successful!!", isLoading:false })
      // console.log("User loged out Success", response);
      // window.alert("User logged out Success");
      window.location = "/login";
    })
    .catch((error) => {
      toast.update(logoutToast, { type: toast.TYPE.ERROR, autoClose: 5000, render: "Error in logging out", isLoading:false })
    })
  };

  onMenuClick = () => {
    document.getElementById("mainnav").classList.toggle("hidden");
    document.getElementById("hamburgericon").classList.toggle("hidden");
    document.getElementById("closeicon").classList.toggle("hidden");
  };

  render() {
    return (
      <div id="navigation-wrapper" className="text-skin-light">
        <div className="w-100 h-fit bg-skin-fill md:flex block justify-between md:px-10 px-5">
          {/* logo */}
          <div className="flex items-center justify-between py-3 md:w-fit w-full">
            <div className="flex items-center justify-center gap-x-2">
              <div className="text-skin-light">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  ></path>
                </svg>
              </div>
              <div className="text-skin-light font-bold text-xl">
                Toronto Weather App
              </div>
            </div>
            <div
              onClick={this.onMenuClick.bind(this)}
              className="md:hidden block"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
                id="hamburgericon"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 hidden"
                viewBox="0 0 20 20"
                fill="currentColor"
                id="closeicon"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          {/* main nav */}
          <div
            id="mainnav"
            className="md:flex hidden items-center justify-evenly md:pb-0 pb-3 ease-out transition-[height] duration-500 "
          >
            <div className="md:flex block gap-x-6 items-center justify-evenly md:mr-20 mr-0">
              <a
                href="/clock"
                className="block md:flex md:w-fit w-full md:py-0 py-1"
              >
                Clock
              </a>
              <a
                href="/weather"
                className="block md:flex md:w-fit w-full md:py-0 py-1"
              >
                Toronto Weather
              </a>
              <a
                href="/aboutus"
                className="block md:flex md:w-fit w-full md:py-0 py-1"
              >
                About Us
              </a>
              <a
                href="/contactus"
                className="block md:flex md:w-fit w-full md:py-0 py-1"
              >
                Contact Us
              </a>
            </div>

            {this.state.isLoggedIn ? (
              <div className="flex gap-x-6 items-center md:justify-evenly justify-start">
                <div>Hello, {this.state.displayName}</div>
                <div
                  onClick={this.LogoutUser.bind(this)}
                  className="bg-skin-button hover:bg-skin-buttonhover font-bold px-5 py-3 rounded-md"
                >
                  Logout
                </div>
              </div>
            ) : (
              <div className="flex gap-x-3 md:gap-x-6 md:mt-0 mt-3 items-center md:justify-evenly justify-start">
                <a href="/login" className="font-bold">
                  Login
                </a>
                <a
                  href="/register"
                  className="bg-skin-button hover:bg-skin-buttonhover font-bold md:px-5 px-4  md:py-3 py-2 rounded-md"
                >
                  Signup
                </a>
              </div>
            )}
          </div>
          {/* login / logout  */}
          
        </div>
      </div>
    );
  }
}
