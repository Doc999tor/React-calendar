import React, { Component } from 'react'
import DemoCalendar from './DemoCalendar/index.jsx'
import { setCalendarAPIs } from 'store/calendar/actions'
import { getEvents } from 'store/events/actions'
import CalendarModal from './CalendarModal/CalendarModal.jsx'
import { Swiper } from 'project-components'
import { connect } from 'react-redux'
// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import timeGridPlugin from '@fullcalendar/timegrid'
// import interactionPlugin from '@fullcalendar/interaction'
// import listPlugin from '@fullcalendar/list'

class Calendar extends Component {
  constructor () {
    super()
    this.state = {
      defaultView: config.calendar.defaultView,
      visibleDays: [
        this.getFormatedDate(config.calendar.defaultDate, 'subtract'),
        config.calendar.defaultDate,
        this.getFormatedDate(config.calendar.defaultDate, 'add')
      ]
    }
  }

  componentDidMount = () => {
    this.props.dispatch(setCalendarAPIs(this.state.visibleDays))
    // this.props.dispatch(getEvents())
  }

  componentDidCatch (error, info) {
    // Display fallback UI
    // this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.log(error, info)
  }

  format = 'YYYY-MM-DD'

  getFormatedDate = (s, action, days = 1) => (action ? moment(s)[action](days, 'days') : moment(s)).format(this.format)

  handleEventClick = info => this.setState({ info })

  onSlideChangeStart = o => {
    const { swipeDirection } = o
    if (swipeDirection) {
      const action = swipeDirection === 'next' ? 'add' : 'subtract'
      const defaultDate = moment(this.defaultDate)[action](1, 'days').format(this.format)
      this.defaultDate = defaultDate
      // console.log(' defaultDate', defaultDate)
    }
  }

  onSlideChangeEnd = () => {
    if (this.defaultDate && (this.defaultDate !== this.state.visibleDays[1])) {
      const visibleDays = [
        this.getFormatedDate(this.defaultDate, 'subtract'),
        this.defaultDate,
        this.getFormatedDate(this.defaultDate, 'add')
      ]
      this.setState({ visibleDays, refresh: true }, () => {
        this.setState({ refresh: false })
        this.props.dispatch(setCalendarAPIs(visibleDays))
      })
    }
  }

  render () {
    if (this.state.refresh) return null
    return (
      <div id='swiper-calendar'>
        <Swiper
          // ref={node => { if (node) this.swiper = node.swiper }}
          onSlideChangeStart={this.onSlideChangeStart}
          onSlideChangeEnd={this.onSlideChangeEnd}
          initialSlide={1}
          loop>
          {this.state.visibleDays.map(i => (
            <div key={i}>
              <DemoCalendar
                eventClick={this.handleEventClick}
                refName={this.props.calendarAPIs['ref' + moment(i)]}
                events={this.props.events}
                defaultView='daily'
                defaultDate={i} />
            </div>
          ))}
        </Swiper>
        <CalendarModal info={this.state.info} handleEventClick={this.handleEventClick} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  eventsFetching: state.events.eventsFetching,
  calendarAPIs: state.calendar.calendarAPIs,
  calendarApi: state.calendar.calendarApi,
  events: state.events.events
})
export default connect(mapStateToProps)(Calendar)
