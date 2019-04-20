import React, { Component } from 'react'
import OffTime from './Popup/OffTime/OffTime.jsx'
import Queue from './Popup/Queue/Queue.jsx'

class CalendarModal extends Component {
  render () {
    if (!this.props.info) return null
    const attr = {
      close: () => this.props.handleEventClick(),
      info: this.props.info
    }
    return (
      <div>{this.props.info?.event?.extendedProps?.off_time 
        ? <OffTime {...attr} /> 
        : <Queue {...attr} />}
      </div>
    )
  }
}

export default CalendarModal
