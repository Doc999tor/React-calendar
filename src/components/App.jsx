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
import { TimeLabel } from './TimeLabels/TimeLabel.jsx'

class App extends Component {

  componentDidMount () {
    let calendar = document.getElementById('swiper-calendar')
    if(calendar) {
      config.workers.length === 1 ? calendar.classList.add('calendar-without-workers') : calendar.classList.add('calendar-with-workers')
    }
  }

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
        <Header calendarApi={this.props?.calendarApi}/>
        {config.workers.length !== 1 && <Workers/>}
        <Calendars/>
        {this.props.eventInfo &&
        <CalendarModal info={this.props.eventInfo} close={() => this.props.dispatch(deleteEventInfo())}/>}
        {(this.props.currentView === 'daily' || this.props.currentView === 'weekly') && <TimeLabel currentView={this.props.currentView}/>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  calendarApi: state.calendar.calendarApi,
  currentView: state.calendar.currentView,
  eventInfo: state.calendar.eventInfo,
  calendar: state.calendar
})
export default connect(mapStateToProps)(App)
