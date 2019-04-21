import React, { Component } from 'react'
import Calendar from './Calendar/index.jsx'
import Agenda from './Agenda/index.jsx'
import Weekly from './Weekly/index.jsx'
import Monthly from './Monthly/index.jsx'
import Header from './Header/Header.jsx'
import Workers from './Workers/Workers.jsx'
import { connect } from 'react-redux'
import './App.styl'

class App extends Component {
  state = {}
  // handleChangeWorker = id => {
  //   config.activeWorkerId = id
  //   let chosenWorker = config.workers.find(worker => worker.id == id)
  //   let calendarApi = this.props.calendarApi
  //   calendarApi.setOption('businessHours', chosenWorker.businessHours)
  //   // this.getCalendarDate()
  // }
  render () {
    const objView = {
      agenda: Agenda,
      daily: Calendar,
      weekly: Weekly,
      monthly: Monthly
    }
    const Calendars = objView[this.props.currentView]
    // console.log('object', this.props)
    return (
      <div className='app'>
        {this.props.calendarApi && <Header calendarApi={this.props.calendarApi} />}
        <Workers changeWorker={this.handleChangeWorker} />
        <Calendars />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  calendarApi: state.calendar.calendarApi,
  currentView: state.calendar.currentView
})
export default connect(mapStateToProps)(App)
