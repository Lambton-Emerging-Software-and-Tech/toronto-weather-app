import React, { Component } from 'react'
import { userLogout } from '../services/authentication'

export default class Nav extends Component {

  state = {
    displayName: 'User',
    isLoggedIn: false
  }
  componentDidMount = () => {
    let accessToken = JSON.parse(localStorage.getItem('access_token'))
    let displayName = JSON.parse(localStorage.getItem('displayName'))
    if(accessToken){
      console.log("Found User")
      this.setState({
        isLoggedIn: true,
        displayName
      })
    }
  }

  LogoutUser = () => {
    userLogout()
    .then((response) => {
      console.log("User loged out Success" , response)
      window.alert('User logged out Success')
      window.location = '/login'
    })
  }

  render() {
    return (
        <div className="text-skin-light">
        <div className="w-100 h-fit bg-skin-fill flex justify-between px-10">
          {/* logo */}
          <div className="flex items-center justify-evenly w-fit gap-x-2 py-3 ">
              <div className="text-skin-light">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              </div>
              <div className="text-skin-light font-bold text-xl">
                Toronto Weather App
              </div>
          </div>
          {/* main nav */}
          <div className="flex items-center justify-evenly">
          <div className="flex gap-x-6 items-center justify-evenly mr-20">
            <a href='/clock' className="">Clock</a>
            <a href='/weather' className="">Toronto Weather</a>
            <a href='/aboutus' className="">About Us</a>
            <a href='/contactus' className="">Contact Us</a>
          </div>
  
          {
            this.state.isLoggedIn ? 
            <div className="flex gap-x-6 items-center justify-evenly">
              <div>Hello, {this.state.displayName}</div>
              <div onClick={this.LogoutUser.bind(this)} className="bg-skin-button hover:bg-skin-buttonhover font-bold px-5 py-3 rounded-md">Logout</div>
            </div>
            :
            <div className="flex gap-x-6 items-center justify-evenly">
            <a href='/login' className="font-bold">Login</a>
            <a href='/register' className="bg-skin-button hover:bg-skin-buttonhover font-bold px-5 py-3 rounded-md">Signup</a>
          </div>
          }
          </div>
          {/* login / logout  */}
        </div>
      </div>
    )
  }
}
