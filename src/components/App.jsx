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
    defaultView: config.calendar.defaultView
  }
  componentDidMount() {
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
    // console.log()
  }
  handleNext = () => {
    let calendarApi = this.calendarComponentRef.current.getApi()
    calendarApi.next()
  }
  handlePrev = () => {
    let calendarApi = this.calendarComponentRef.current.getApi()
    calendarApi.prev()
  }
  render () {
    return (
      <div className='app'>
        <Header changeView={this.handleChangeView} today={this.handleToday} next={this.handleNext} prev={this.handlePrev} />
        <Workers />
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
