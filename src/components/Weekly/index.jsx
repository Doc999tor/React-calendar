import React, { Component } from 'react'
import DemoCalendar from './DemoCalendar/index.jsx'
import { getEvents } from 'store/events/actions'
import CalendarModal from './CalendarModal/CalendarModal.jsx'
import { setCalendarAPI } from 'store/calendar/actions'
import { getFormattedDate } from 'helpers'
import { connect } from 'react-redux'
import './Weekly.styl'

class Weekly extends Component {
  state = {}

  componentDidMount = async () => {
    // await this.props.dispatch(getEvents())
  }

  handleEventClick = info => this.setState({ info })

  render () {
    const defaultAttr = {
      eventClick: this.handleEventClick
    }

    return (
      <div>
        <div id='swiper-calendar-weekly'>
          <DemoCalendar
            defaultDate={this.props.defaultDate}
            events={this.props.events}
            {...defaultAttr} />
          <DemoCalendar
            defaultDate={getFormattedDate(this.props.defaultDate, 'add', 4)}
            refs={node => this.props.dispatch(setCalendarAPI(node, this.props.defaultDate))}
            events={this.props.events}
            {...defaultAttr} />
          <DemoCalendar
            defaultDate={getFormattedDate(this.props.defaultDate, 'add', 8)}
            // refs={node => this.props.dispatch(setCalendarAPI(node, this.state.defaultDate))}
            events={this.props.events}
            {...defaultAttr} />
        </div>
        <CalendarModal info={this.state.info} handleEventClick={this.handleEventClick} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  eventsFetching: state.events.eventsFetching,
  events: state.events.events,
  defaultDate: state.calendar.defaultDate
})
export default connect(mapStateToProps)(Weekly)
