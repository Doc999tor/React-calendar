import React, { Component } from 'react'
import DemoCalendar from './Calendar/Calendar.jsx'
import Header from './Header/Header.jsx'
import Workers from './Workers/Workers.jsx'
import { connect } from 'react-redux'
import { Swiper } from 'project-components'
import { getEvents } from '.././store/events/actions'
import './App.styl'
class App extends Component {
  calendarComponentRef = React.createRef()
  state = {
    defaultView: config.calendar.defaultView,
    active: false
  }
  componentDidMount() {
    let calendarApi = this.calendarComponentRef.current.getApi()
    let activeWorker = config.workers.find(worker => worker.id == config.activeWorkerId)
    let businessHours = activeWorker.businessHours
    calendarApi.setOption('businessHours', activeWorker.businessHours)
    this.props.dispatch(getEvents())
  }
  handleChangeView = () => {
    let calendarApi = this.calendarComponentRef.current.getApi()
    if (calendarApi.view.type === 'timeGridDay') {
      calendarApi.changeView('timeGridWeek')
    } else if (calendarApi.view.type === 'timeGridWeek') {
      calendarApi.changeView('dayGridMonth')
    } else if (calendarApi.view.type === 'dayGridMonth') {
      calendarApi.changeView('listWeek')
    } else if (calendarApi.view.type === 'listWeek') {
      calendarApi.changeView('timeGridDay')
    }
  }
  handleToday = () => {
    let calendarApi = this.calendarComponentRef.current.getApi()
    calendarApi.today()
  }
  handleNext = () => {
    let calendarApi = this.calendarComponentRef.current.getApi()
    calendarApi.next()
  }
  handlePrev = () => {
    let calendarApi = this.calendarComponentRef.current.getApi()
    calendarApi.prev()
  }
  handleChangeWorker = id => {
    config.activeWorkerId = id
    let chosenWorker = config.workers.find(worker => worker.id == id)
    let calendarApi = this.calendarComponentRef.current.getApi()
    calendarApi.setOption('businessHours', chosenWorker.businessHours)
    this.setState({ active: true })
  }
  render () {
    return (
      <div className='app'>
        <Header changeView={this.handleChangeView} today={this.handleToday} next={this.handleNext} prev={this.handlePrev} />
        <Workers changeWorker={this.handleChangeWorker} />
        <div id='swiper-calendar'>
          {/* <Swiper initialSlide={1} > */}
            {/* <div> */}
              <DemoCalendar defaultView={this.state.defaultView} events={this.props.events} refName={this.calendarComponentRef} />
            {/* </div> */}
            {/* <div> */}
              {/* <DemoCalendar defaultView={this.state.defaultView} events={this.props.events} refName={this.calendarComponentRef} /> */}
            {/* </div> */}
            {/* <div> */}
              {/* <DemoCalendar defaultView={this.state.defaultView} events={this.props.events} refName={this.calendarComponentRef} /> */}
            {/* </div> */}
          {/* </Swiper> */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  eventsFetching: state.events.eventsFetching,
  events: state.events.events
})
export default connect(mapStateToProps)(App)
