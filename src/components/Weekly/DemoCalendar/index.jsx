import React, { Component } from 'react'
import { setCalendarAPI } from 'store/calendar/actions'
import { connect } from 'react-redux'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import '@fullcalendar/core/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
import '@fullcalendar/list/main.css'

class DemoCalendar extends Component {
  render () {
    return (
      <FullCalendar
        {...config.calendar}
        ref={node => this.props.dispatch(setCalendarAPI(node, this.props.defaultDate))}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        defaultView='weekly'
        {...this.props}
      />
    )
  }
}

export default connect()(DemoCalendar)
