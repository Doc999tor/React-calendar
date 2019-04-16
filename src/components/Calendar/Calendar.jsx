import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import '@fullcalendar/core/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
import '@fullcalendar/list/main.css'

export default class DemoCalendar extends Component {
  render () {
    return (
      <FullCalendar
        {...config.calendar}
        defaultView={this.props.defaultView}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        events={this.props.events}
        ref={this.props.refName}
        eventClick={this.props.eventClick}
      />
    )
  }
}
