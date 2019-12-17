import React, { Component } from 'react'
import { setCalendarAPI, getEventInfo } from 'store/calendar/actions'
import renderDailyEvents, { eventPositioned } from '../../helpers/dailyEvents'
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
import './Calendar.styl'

class DemoCalendar extends Component {
  calendarRef = React.createRef()

  handleEventClick = eventInfo => {
    if (this.props.defaultView !== 'monthly') {
      this.props.getEventInfo(eventInfo)
    }
  }

  componentDidMount () {
    if(!this.props.calendarApi) {
      this.props.setCalendarAPI(this.calendarRef.current, this.props.defaultDate)
    }
    if(this.props.defaultView === 'daily' ) {
      let swiper = document.getElementById('swiper-calendar')
      swiper.style.paddingInlineStart = '34px'
      swiper.style.mozPaddingStart = '34px'
      swiper.style.webkitPaddingStart = '34px'
      swiper.style.blabla = '33px'
    }
  }

  render () {
    let documentHeight = document.documentElement.clientHeight
    let calendarHeight = config.workers.length === 1 ? documentHeight - 60 : documentHeight - 161
    return (
      <React.Fragment>
        <FullCalendar
          {...config.calendar}
          defaultView={this.props.defaultView}
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
          ref={this.calendarRef}
          eventClick={this.handleEventClick}
          defaultDate={this.props.defaultDate}
          events={this.props.events[this.props.defaultDate]}
          columnHeaderText={this.props.columnHeaderText}
          contentHeight={this.props.defaultView === 'monthly' ? calendarHeight : 'auto'}
          eventRender={(data) => renderDailyEvents(data)}
          eventPositioned={(data) => eventPositioned(data, this.props.calendarApi)}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  calendarApi: state.calendar.calendarApi,
})
export default connect(mapStateToProps, {setCalendarAPI, getEventInfo})(DemoCalendar)

