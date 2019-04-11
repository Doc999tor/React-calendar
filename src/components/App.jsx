import React, { Component } from 'react'
import DemoCalendar from './Calendar/Calendar.jsx'
import Header from './Header/Header.jsx'
import Workers from './Workers/Workers.jsx'
import { connect } from 'react-redux'
import { getEvents } from '.././store/events/actions'
import './App.styl'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(getEvents())
  }
  render () {
    return (
      <div className='app'>
        <Header />
        <Workers />
        <DemoCalendar events={this.props.events}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  eventsFetching: state.events.eventsFetching,
  events: state.events.events
})
export default connect(mapStateToProps)(App)
