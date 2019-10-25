import React, { Component } from 'react'
import CalendarModal from './CalendarModal/CalendarModal.jsx'
import { deleteEventInfo } from 'store/calendar/actions'
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
    // console.log('this.props.calendarApi', this.props.calendarApi)
    // console.log('this.props', this.props)
    return (
      <div className='app'>
        <Header calendarApi={this.props.calendarApi} />
        <Workers />
        <Calendars />
        {this.props.eventInfo && <CalendarModal info={this.props.eventInfo} close={() => this.props.dispatch(deleteEventInfo())} />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  calendarApi: state.calendar.calendarApi,
  currentView: state.calendar.currentView,
  eventInfo: state.calendar.eventInfo
})
export default connect(mapStateToProps)(App)
