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
  componentDidMount() {
    this.props.dispatch(getEvents())
  }
  render () {
    const params = {
    }
    return (
      <div className='app'>
        <Header />
        <Workers />
        <div id='swiper-calendar'>
          <Swiper initialSlide={1} loop>
            <div>
              <DemoCalendar events={this.props.events} refName={this.calendarComponentRef} />
            </div>
            <div>
              <DemoCalendar events={this.props.events} refName={this.calendarComponentRef} />
            </div>
            <div>
              <DemoCalendar events={this.props.events} refName={this.calendarComponentRef} />
            </div>
          </Swiper>
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
