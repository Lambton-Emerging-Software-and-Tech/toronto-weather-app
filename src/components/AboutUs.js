import React, { Component } from "react";

export default class AboutUs extends Component {
  render() {
    return (
      <div className="w-full h-full flex flex-center justify-center mt-10 sm:mt-10">
        <div className="flex flex-col align-center justify-center">
          <div className="text-4xl mb-5">Team Members</div>
          <div>Milan Lakhani</div>
          <div>Jaimin Patel</div>
          <div>Nihar Dhanani</div>
          <div>Nehalkumar Jesdadia</div>
          <div>Gurmanjot Chemma</div>
        </div>
      </div>
    );
  }
}
