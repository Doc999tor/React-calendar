import React, { Component } from 'react'
import DemoCalendar from './Calendar/Calendar.jsx'
import { connect } from 'react-redux'
import { getEvents } from '.././store/events/actions'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(getEvents())
  }
  render () {
    return (
      <div>
        <h1>React Calendar!</h1>
        <DemoCalendar events={this.props.events} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  eventsFetching: state.events.eventsFetching,
  events: state.events.events
})
export default connect(mapStateToProps)(App)
