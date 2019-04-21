import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { connect } from 'react-redux'
import { setCalendarAPI } from 'store/calendar/actions'
import '@fullcalendar/core/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
import '@fullcalendar/list/main.css'

class DemoCalendar extends Component {
  render () {
    return (
      <FullCalendar
        {...config.calendar}
        defaultView={this.props.defaultView}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        ref={node => this.props.dispatch(setCalendarAPI(node, this.props.defaultDate))}
        {...this.props}
      />
    )
  }
}
export default connect()(DemoCalendar)
