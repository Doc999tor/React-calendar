import React, { Component } from 'react'
import Workers from './Workers/Workers.jsx'
import Monthly from './Monthly/index.jsx'
import Header from './Header/Header.jsx'
import Agenda from './Agenda/index.jsx'
import Weekly from './Weekly/index.jsx'
import Daily from './Daily/index.jsx'
import { connect } from 'react-redux'
import './App.styl'

class App extends Component {
  render () {
    const objView = {
      monthly: Monthly,
      agenda: Agenda,
      weekly: Weekly,
      daily: Daily
    }
    const Calendars = objView[this.props.currentView]
    return (
      <div className='app'>
        {this.props.calendarApi && <Header calendarApi={this.props.calendarApi} />}
        <Workers />
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
