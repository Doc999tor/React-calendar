import React, { Component } from 'react'
import CalendarModal from './CalendarModal/CalendarModal.jsx'
import DemoCalendar from 'components/DemoCalendar/index.jsx'
import { getEvents } from 'store/events/actions'
// import { getFormattedDate, getStandardFormat } from 'helpers'
import { setDefaultDay } from 'store/calendar/actions'
import { Swiper } from 'project-components'
import { getFormattedDate } from 'helpers'
import { connect } from 'react-redux'

class Calendar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      defaultView: config.calendar.defaultView,
      visibleDays: [
        getFormattedDate(props.defaultDate, 'subtract', 'days'),
        props.defaultDate,
        getFormattedDate(props.defaultDate, 'add', 'days')
      ]
    }
  }

  static getDerivedStateFromProps (props) {
    return props.defaultDayRefresh
      ? {
        visibleDays: [
          getFormattedDate(props.defaultDate, 'subtract', 'days'),
          props.defaultDate,
          getFormattedDate(props.defaultDate, 'add', 'days')
        ]
      }
      : null
  }

  componentDidMount = () => {
    this.props.dispatch(getEvents())
  }

  onSlideChangeEnd = ({ swipeDirection }) => {
    let dd
    if (swipeDirection) {
      const action = swipeDirection === 'next' ? 'add' : 'subtract'
      dd = getFormattedDate(this.props.defaultDate, action)
      this.props.dispatch(setDefaultDay(dd))
    }
    if (dd && (dd !== this.state.visibleDays[1])) {
      const visibleDays = [ getFormattedDate(dd, 'subtract', 'days'), dd, getFormattedDate(dd, 'add', 'days') ]
      this.setState({ visibleDays, refresh: true }, () => {
        this.setState({ refresh: false })
      })
    }
  }

  render () {
    if (this.state.refresh || this.props.defaultDayRefresh) return null
    return (
      <div id='swiper-calendar'>
        <Swiper
          onSlideChangeEnd={this.onSlideChangeEnd}
          initialSlide={1}
          loop>
          {this.state.visibleDays.map(i => (
            <div key={i}>
              <DemoCalendar
                eventClick={this.handleEventClick}
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
  defaultDayRefresh: state.calendar.defaultDayRefresh,
  eventsFetching: state.events.eventsFetching,
  defaultDate: state.calendar.defaultDate,
  calendarApi: state.calendar.calendarApi,
  events: state.events.events
})
export default connect(mapStateToProps)(Calendar)
