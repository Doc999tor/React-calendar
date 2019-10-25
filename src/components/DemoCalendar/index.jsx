import React, { Component } from 'react'
import { setCalendarAPI, getEventInfo } from 'store/calendar/actions'
import { connect } from 'react-redux'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list'
import '@fullcalendar/timegrid/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/list/main.css'
import '@fullcalendar/core/main.css'

class DemoCalendar extends Component {
  calendarRef = React.createRef()
  handleEventClick = eventInfo => this.props.dispatch(getEventInfo(eventInfo))
  componentDidUpdate (prevProps, prevState, snapshot) {
    this.props.dispatch(setCalendarAPI(this.calendarRef.current, this.props.defaultDate))
  }

  render () {
    return (
      <React.Fragment>
        <FullCalendar
          {...config.calendar}
          defaultView={this.props.defaultView}
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
          ref={this.calendarRef}
          eventClick={this.handleEventClick}
          {...this.props}
        />
      </React.Fragment>
    )
  }
}

export default connect()(DemoCalendar)
