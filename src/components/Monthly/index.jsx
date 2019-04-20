import React, { Component } from 'react'
// import DemoCalendar from './DemoCalendar/index.jsx'
import { getEvents } from 'store/events/actions'
import CalendarModal from './CalendarModal/CalendarModal.jsx'
// import { Swiper } from 'project-components'
import { connect } from 'react-redux'

class Monthly extends Component {
  state = {}

  componentDidMount = async () => {
    await this.props.dispatch(getEvents())
    this.setEvents()
  }

  handleEventClick = info => this.setState({ info })

  render () {
    // const defaultAttr = {
    //   defaultView: this.state.defaultView,
    //   eventClick: this.handleEventClick
    // }

    return (
      <div>
        <div id='swiper-calendar'>
          Monthly wip
        </div>
        <CalendarModal info={this.state.info} handleEventClick={this.handleEventClick} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  eventsFetching: state.events.eventsFetching,
  events: state.events.events
})
export default connect(mapStateToProps)(Monthly)
