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
  state = {
    active: false,
    calendarDate: '',
    view: '',
    viewType: config.calendar.defaultView,
    todayBtn: true
  }
  
  handleChangeWorker = id => {
    config.activeWorkerId = id
    let chosenWorker = config.workers.find(worker => worker.id == id)
    let calendarApi = this.calendarComponentRef.current.getApi()
    calendarApi.setOption('businessHours', chosenWorker.businessHours)
    this.setState({ active: true })
    this.getCalendarDate()
  }

  render () {
    const objView = {
      agenda: Agenda,
      daily: Calendar,
      weekly: Weekly,
      monthly: Monthly
    }
    const Calendars = objView[this.state.viewType]
    return (
      <div className='app'>
        {this.props.calendarApi && <Header calendarApi={this.props.calendarApi} />}
        <Workers changeWorker={this.handleChangeWorker} />
        <Calendars view={this.state.viewType} calendarComponentRef={this.calendarComponentRef} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  calendarApi: state.calendar.calendarApi
})
export default connect(mapStateToProps)(App)
