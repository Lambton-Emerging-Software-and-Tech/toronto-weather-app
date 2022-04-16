import React, { Component } from "react";
import { toast } from "react-toastify";
import { logInWithEmailAndPassword } from "../services/authentication";
// import { API } from "../api";
// import Axios from "../services/axios";
// import axios from "../services/axios";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    isError: false,
    errorMessage: "",
    allRequiredFields: false,
  };

  componentDidMount = () => {
    // making sure that login screen does not appear if user is logged in and redirected to the dashboard
    if(JSON.parse(localStorage.getItem('access_token'))){
      window.location = '/weather'
    }
  };

  /**
   * Validates all form fields are present
   * @param {Object} data contains form data variables
   * @returns
   */
  validateRequiredFields = (data) => {
    return data.email.length && data.password.length;
  };

  /**
   * common Event listener for form fields changes
   * @param {Events} e events
   */
  changeFormValues = (e) => {
    let name = e.target.name;
    let allRequiredFields = this.state.allRequiredFields;

    let obj = {
      email: this.state.email,
      password: this.state.password,
    };

    obj[name] = e.target.value;

    if (this.validateRequiredFields(obj)) {
      allRequiredFields = true;
    } else {
      allRequiredFields = false;
    }

    this.setState({
      [name]: e.target.value,
      allRequiredFields,
    });
  };

  /**
   * on subit button click
   */
  submitLoginForm = () => {
    if (this.state.allRequiredFields) {
    //   const data = {
    //     password: this.state.password,
    //     email: this.state.email,
    //   };
      let loginToast = toast.loading("Logging you in..")
      logInWithEmailAndPassword(this.state.email, this.state.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("Login successful with user", user)
          
          sessionStorage.setItem('Auth Token', userCredential?._tokenResponse?.refreshToken)
          toast.update(loginToast, { type: toast.TYPE.SUCCESS, autoClose: 5000, render: "Login successful!!", isLoading:false })
          window.location = '/weather'
          // ...
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.update(loginToast, { type: toast.TYPE.ERROR, autoClose: 5000, render: errorMessage, isLoading:false })
        });
    }
  };

  render() {
    return (
      <div className="w-full h-full flex flex-center justify-center mt-10 sm:mt-10">
        <div className="wrapper flex flex-col my-auto w-72 sm:w-96 px-3 py-10 rounded-md border-2 shadow-md">
          <div className="text-skin-dark text-center font-bold text-lg mb-4">
            Toronto Weather App Login
          </div>
          <div className="my-4">
            <div className="mb-3">
              <label
                htmlFor="email-address"
                className="text-xs ml-1 text-skin-dark"
              >
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative text-xs sm:text-sm block w-full px-3 py-2 border  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-skin-dark focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={this.changeFormValues.bind(this)}
                value={this.state.email}
                onFocus={(e) => this.setState({ isError: false })}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-xs ml-1 text-skin-dark">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative text-xs sm:text-sm block w-full px-3 py-2 border text-skin-dark rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-skin-dark focus:z-10 "
                placeholder="Password"
                onChange={this.changeFormValues.bind(this)}
                value={this.state.password}
                onFocus={(e) => this.setState({ isError: false })}
              />
            </div>
          </div>
          {this.state.isError && (
            <div className={`text-red-600 text-xs ml-2`}>
              <div
                className={`${
                  this.state.allRequiredFields ? "text-green-600" : ""
                }`}
              >
                {this.state.errorMessage}
              </div>
            </div>
          )}
          <div className="mt-3">
            <button
              disabled={!this.state.allRequiredFields}
              onClick={this.submitLoginForm.bind(this)}
              className="bg-skin-button rounded-md w-full text-skin-light px-4 py-2 text-base"
            >
              Login
            </button>
          </div>
          <div className="text-xs text-right mt-2 text-skin-dark">
            <a className="text-blue-600" href="#">
              Forgot Password?
            </a>
          </div>
          <div className="text-xs text-right mt-2 text-skin-dark">
            New to Financial Advisor?{" "}
            <a className="text-blue-600" href="/signup">
              Signup
            </a>
          </div>
        </div>
      </div>
    );
  }
}
