import React, { Component } from 'react'

export default class Clock extends Component {

  state = {
    date: new Date()
  }

  componentDidMount = () => {
    setInterval(() => {
      this.setState({ date: new Date()})
    }, 1000) 

    // document.getElementById("navigation-wrapper").offsetHeight
  }

  /**
   * returns a complete date in string format
   * @param {String} datestr input date in string format -> '01 Sept, 2021'
   * @returns complete date -> "2022-04-16"
   */
  getCompleteDate = (date) => {
    // let date = new Date(datestr.replace(/-/g, "/").toString());
    const dateNum = date.getDate();
    const fullYear = date.getFullYear();
    const month = date.getMonth() + 1;
    return date.getFullYear() + '-' + ('0' + month).slice(-2) + '-' + ('0' + dateNum).slice(-2)
  };

  getCompleteTime = (time) => {

    return ('0' + time.getHours()).slice(-2) + ':' + ('0' + time.getMinutes()).slice(-2) + ':' + ('0' + time.getSeconds()).slice(-2)
  };

  render() {
    return (
      <div className='flex items-center justify-center my-auto h-screen bg-skin-fill'>
        <div className='flex flex-col justify-center items-center text-skin-light gap-y-5'>
          <div className='md:text-9xl text-7xl font-bold'>{this.getCompleteTime(this.state.date)}</div>
          <div className='md:text-6xl text-5xl'>{this.getCompleteDate(this.state.date)}</div>
        </div>
      </div>
    )
  }
}
