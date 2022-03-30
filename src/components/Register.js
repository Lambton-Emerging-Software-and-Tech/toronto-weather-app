import { deleteUser } from "firebase/auth";
import React, { Component } from "react";
import { registerUserwithEmailAndPassword, updateUserDisplayName } from "../services/authentication";
// import { API } from "../api";
// import Axios from "../services/axios";

export default class Register extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isTouched: false,
    isPasswordValidated: false,
    isPasswordMatching: false,
    allRequiredFields: false,
    isFormValid: false,
  };

  componentDidMount = () => {
    // making sure that login screen does not appear if user is logged in and redirected to the dashboard  
    // if(JSON.parse(localStorage.getItem('token'))){
    //   window.location = '/dashboard'
    // }
  } 

  /**
   * Validates all form fields are present
   * @param {Object} data contains form data variables
   * @returns
   */
  validateRequiredFields = (data) => {
    return (
      data.firstName.length &&
      data.lastName.length &&
      data.email.length &&
      data.password.length &&
      data.confirmPassword.length
    );
  };

  /**
   * Checks if password is equal to confirm password
   * @param {Object} data contains form state variables
   * @returns
   */
  validatePasswordsMatch = (data) => {
    console.log("during password match: ", data)
    return data.password === data.confirmPassword;
  };

  /**
   * Validates the password
   * @param {Object} data contains form state variables
   * @returns
   */
  validatePassword = (data) => {
    let password = data.password;
    // console.log(password)
    // console.log("A-Z", password.match(/[A-Z]/))
    // console.log("a-z", password.match(/[a-z]/))
    // console.log("0-9", password.match(/[0-9]/))
    // console.log("@#$%^&*", password.match(/[@#$%^&*]/))
    return (
      password.length >= 8 &&
      password.length <= 16 &&
      password.match(/[a-z]/)?.length &&
      password.match(/[A-Z]/)?.length &&
      password.match(/[0-9]/)?.length &&
      password.match(/[@#$%^&*]/)?.length
    );
  };

  /**
   * common Event listener for form fields changes
   * @param {Events} e events
   */
  changeFormValues = (e) => {
    let name = e.target.name;
    let isPasswordValidated = this.state.isPasswordValidated;
    let isPasswordMatching = this.state.isPasswordMatching;
    let allRequiredFields = this.state.allRequiredFields;

    let obj = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };

    obj[name] = e.target.value;

    if (this.validatePassword(obj)) {
      isPasswordValidated = true;
    } else {
      isPasswordValidated = false;
    }

    if (this.validatePasswordsMatch(obj) && isPasswordValidated) {
      isPasswordMatching = true;
    } else {
      isPasswordMatching = false;
    }

    if (this.validateRequiredFields(obj)) {
      allRequiredFields = true;
    } else {
      allRequiredFields = false;
    }

    this.setState({
      [name]: e.target.value,
      allRequiredFields,
      isPasswordMatching,
      isPasswordValidated,
      isFormValid:
        isPasswordMatching && allRequiredFields && isPasswordValidated
          ? true
          : false,
    });
  };

  /**
   * on submit button click
   */
  submitSignUpForm = () => {
    if (this.state.isFormValid) {
      const data = {
        password: this.state.password,
        firstname: this.state.firstName,
        lastname: this.state.lastName,
        email: this.state.email,
      };

      registerUserwithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("Register Success!! with ", userCredential)
        sessionStorage.setItem('Auth Token', userCredential?._tokenResponse?.refreshToken)
        // ...

        // Update user displayname
        let displayName = data.firstname + " " + data.lastname;  
        updateUserDisplayName(user, displayName)
          .then(() => {
            console.log(`User's display name updated to ${displayName}`);
            window.location = '/login';
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            // delete user and redirect to register page if there is an error in updating the displayname
            deleteUser(user).then(() => {
              console.log('user successfully deleted');
              window.location = '/register';
            }).catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
            });
          })

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    //   Axios("POST", API.SIGNUP, false, data)
    //   .then(res => {
    //     let data = res.data
    //     if(data.Success) {
    //       //redirect to login page due to success register
    //       // window.alert('Register Success')
    //       window.location = '/login';
    //     } else {
    //       if(data?.ResponseCode === 401){
    //         window.alert(data.ErrorMessage);
    //       } else {
    //         window.alert("An unexpected error occurred. Please try again later.");
    //       }
    //     }
    //   })
    }
  };

  render() {
    return (
      <div className="w-full h-full flex flex-center justify-center mt-10 sm:my-10">
        <div className="wrapper flex flex-col my-auto w-72 sm:w-96 px-3 py-10 rounded-md border-2 shadow-md">
          <div className="text-skin-dark text-center font-bold text-lg mb-4">
            Financial Advisor Login
          </div>
          <div className="my-4">
            <div className="mb-1 flex space-x-3">
              <div className="flex-1">
                <label
                  htmlFor="first-name"
                  className="text-xs ml-1 text-skin-dark"
                >
                  First Name
                </label>
                <input
                  id="first-name"
                  name="firstName"
                  type="text"
                  autoComplete=""
                  required
                  className="appearance-none rounded-md relative text-xs sm:text-sm block w-full px-3 py-2 border  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-skin-dark focus:z-10 sm:text-sm"
                  placeholder="First Name"
                  onChange={this.changeFormValues.bind(this)}
                  value={this.state.firstName}
                  onFocus={(e) => this.setState({ isTouched: true })}
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="last-name"
                  className="text-xs ml-1 text-skin-dark"
                >
                  Last Name
                </label>
                <input
                  id="last-name"
                  name="lastName"
                  type="text"
                  autoComplete=""
                  required
                  className="appearance-none rounded-md relative text-xs sm:text-sm block w-full px-3 py-2 border  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-skin-dark focus:z-10 sm:text-sm"
                  placeholder="Last Name"
                  value={this.state.lastName}
                  onFocus={(e) => this.setState({ isTouched: true })}
                  onChange={this.changeFormValues.bind(this)}
                />
              </div>
            </div>
            <div className="mb-1">
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
                value={this.state.email}
                onFocus={(e) => this.setState({ isTouched: true })}
                onChange={this.changeFormValues.bind(this)}
              />
            </div>
            <div className="mb-1">
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
                value={this.state.password}
                onFocus={(e) => this.setState({ isTouched: true })}
                onChange={this.changeFormValues.bind(this)}
              />
            </div>
            <div className="mb-1">
              <label
                htmlFor="confirmpassword"
                className="text-xs ml-1 text-skin-dark"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="confirm-password"
                required
                className="appearance-none rounded-md relative text-xs sm:text-sm block w-full px-3 py-2 border text-skin-dark rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-skin-dark focus:z-10 "
                placeholder="Confirm Password"
                value={this.state.confirmPassword}
                onFocus={(e) => this.setState({ isTouched: true })}
                onChange={this.changeFormValues.bind(this)}
              />
            </div>
          </div>
          {this.state.isTouched && (
            <div className={`text-red-600 text-xs ml-2`}>
              <div className={`${this.state.allRequiredFields ? 'text-green-600': ''}`}>Al Fields are Required</div>
              <div className={`${this.state.isPasswordMatching ? 'text-green-600': ''}`}>Confirm Password should match the password</div>
              <div
                className={`${this.state.isPasswordValidated ? 'text-green-600': ''}`}
                data-bs-toggle="tooltip"
                title="8-16 Characters of length &#013;Contains at least 1 alphabet character&#013;Contains at least 1 numerical character&#013;Contains at least 1 special character {#, $, @, ^, %, !"
              >
                Password constraints
              </div>
            </div>
          )}
          <div className="mt-3">
            <button
              disabled={!this.state.isFormValid}
              onClick={this.submitSignUpForm.bind(this)}
              className="bg-skin-button rounded-md w-full text-skin-light px-4 py-2 text-base"
            >
              Signup
            </button>
          </div>
          <div className="text-xs text-right mt-2 text-skin-dark">
            <a className="text-blue-600" href="#">
              Forgot Password?
            </a>
          </div>
          <div className="text-xs text-right mt-2 text-skin-dark">
            Already a user?{" "}
            <a className="text-blue-600" href="/login">
              Login
            </a>
          </div>
        </div>
      </div>
    );
  }
}
